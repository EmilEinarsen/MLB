import { Request, Response } from "express"
import config from "../config"
import path from 'path'
import * as jwt from "jsonwebtoken"
import User from "../entity/User"
import { getRepository } from "typeorm"

class Controller {
	
	static async login(req: Request, res: Response) {
		let { email, password } = req.body
		
		if(!(email && password)) return res.status(400).send()
		
		const userRepository = getRepository(User)
		let user: User
		try {
			user = await userRepository.findOneOrFail({ where: { email } });
		} catch (error) {
			res.status(401).send()
			return
		}

		//Check if encrypted password match
		if(!user.isUnencryptedPasswordValid(password)) return res.status(401).send()

		//Sign JWT, valid for 1 hour
		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			config.jwtSecret,
			{ expiresIn: "1h" }
		)
		
		res.send({ token })
	}

	static async getAll(req: Request, res: Response | any) {
		const userId = res.locals.jwtPayload.userId
		
		if(!userId) return res.status(401).send()

		const result: any = await User.getById(userId)
		const error = result.status && result

		if(error) return res.status(error.status).send(error.message)
		
        res.sendWithToken(result)
    }

    static async getFile(req: Request, res: Response) {
        res.sendFile(path.resolve(`public/assets/${req.params.type}/${req.params.name}`))
    }

}

export default Controller