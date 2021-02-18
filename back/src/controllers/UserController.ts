import { Request, Response } from "express"
import User from "../entity/User"

class UserController {
	static getAll = async (req: Request, res: Response | any) => {
		try {
			res.sendWithToken(await User.getAll())
		} catch (error) {
			res.status(404).sendWithToken()
		}
	}

	static get = async (req: Request, res: Response | any) => {
		const id = res.locals.jwtPayload.userId
		
		try {
			res.sendWithToken(await User.getById(id))
		} catch (error) {
			res.status(404).send()
		}
	}

	static create = async (req: Request, res: Response | any) => {
		const error = await User.create(req.body)

		if(error) return res.status(error.status).send(error.message)

		res.status(201).sendWithToken()
	}

	static update = async (req: Request, res: Response | any) => {
		const id = res.locals.jwtPayload.userId
		
		const error = await User.update(id, req.body)

		if(error) return res.status(error.status).send(error.message)
		
		res.status(204).sendWithToken()
	}

	static delete = async (req: Request, res: Response | any) => {
		const id = res.locals.jwtPayload.userId
		const error = await User.delete(id)

		if(error) return res.status(error.status).send(error.message)

		res.status(204).sendWithToken()
	}

	static changePassword = async (req: Request, res: Response | any) => {
		const id = res.locals.jwtPayload.userId

		const error = await User.changePassword(id, req.body)
		
		if(error) return res.status(error.status).send(error.message)

		res.status(204).sendWithToken()
	}
}

export default UserController