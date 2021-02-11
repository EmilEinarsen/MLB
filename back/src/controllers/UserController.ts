import { Request, Response } from "express"
import { User } from "../entity/User"

class UserController {
	static getAll = async (req: Request, res: Response) => {
		try {
			res.send(await User.getAll())
		} catch (error) {
			res.status(404).send()
		}
	}

	static get = async (req: Request, res: Response) => {
		const id = res.locals.jwtPayload.userId
		
		try {
			res.send(await User.getById(id))
		} catch (error) {
			res.status(404).send()
		}
	}

	static create = async (req: Request, res: Response) => {
		const error = await User.create(req.body)

		if(error) return res.status(error.status).send(error.message)

		res.status(201).send()
	}

	static update = async (req: Request, res: Response) => {
		const id = res.locals.jwtPayload.userId
		
		const error = await User.update(id, req.body)

		if(error) return res.status(error.status).send(error.message)
		
		res.status(204).send()
	}

	static delete = async (req: Request, res: Response) => {
		const id = res.locals.jwtPayload.userId
		const error = await User.delete(id)

		if(error) return res.status(error.status).send(error.message)

		res.status(204).send()
	}

	static changePassword = async (req: Request, res: Response) => {
		const id = res.locals.jwtPayload.userId

		const error = await User.changePassword(id, req.body)
		
		if(error) return res.status(error.status).send(error.message)

		res.status(204).send()
	}
}

export default UserController