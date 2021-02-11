import { Request, Response } from "express"
import config from "../config"
import modal from "../models/modal"
import path from 'path'
import * as jwt from "jsonwebtoken"
import { User } from "../entity/User"
import { getRepository } from "typeorm"
import { updateExpressionWithTypeArguments } from "typescript"

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

	static async getAll(req: Request, res: Response) {
		const userId = res.locals.jwtPayload.userId
		if(!userId) return res.status(401).send()

		let user
		try {
			user = await User.getById(userId)
		} catch (error) {
			res.status(401).send()
			return
		}
		console.log(user)
        res.send(user)
    }

    static async getImg(req: Request, res: Response) {
        res.sendFile(path.resolve('public/assets/'+req.params.name))
    }

}

export default Controller