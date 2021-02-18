import { Request, Response } from "express"
import Doc from "../entity/Doc"
import File from "../entity/File"

export default class DocController {
    static async create(req: Request, res: Response | any) {
		const userId = res.locals.jwtPayload.userId
		
        const result: any = !req.body.length 
            ? await Doc.create(userId, req.body) 
            : await Doc.createMult(userId, req.body)
		
		const error = result.status && result

		if(error) return res.status(error.status).send(error.message)

        res.sendWithToken(result)
    }

    static async get(req: Request, res: Response | any) {
        let result: any = await Doc.getById(req.body.id)

		const error = result.status && result

		if(error) return res.status(error.status).send(error.message)

        res.sendWithToken(result)
    }

    static async update(req: Request, res: Response | any) {
		const payload: any = await getPayload(req.body)
		
        const error = payload.status ? payload : await Doc.update(payload)
		if(error) return res.status(error.status).send(error.message)

        res.status(201).sendWithToken()
    }

    static async delete(req: Request, res: Response | any) {
		const { id, ids } = req.body
		if(!id && !ids) res.status(404).send()

        const error =
            id ? await Doc.delete(id)
            :  await Doc.deleteMult(ids)

		if(error) return res.status(error.status).send(error.message)

        res.status(201).sendWithToken()
    }

    static async getAll(req: Request, res: Response | any) {
        let result = await Doc.getAll()
        
        res.sendWithToken(result)
    }
}

const getPayload = async (payload: any) => await checkFile('music', await checkFile('img', payload)) 

const checkFile = async (key: string, payload) => {
	const uid = payload[key+'Uid'] ?? payload[key]?.uid
	const file: any = uid && await File.getById(uid)
	
	return file ? { ...payload, [key]: file } : payload
}