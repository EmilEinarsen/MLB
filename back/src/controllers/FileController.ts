import { Request, Response } from "express"
import File from "../entity/File"
import upload from "../utils/fileStorage"

export default class FileController {
    static async create(req: any, res: Response | any) {
        try {
            upload.single('file')(req, res, async () => {
				if(!req.file) return res.status(400).send()
                const file: any = await File.create({ name: extractOriginalName(req.file.filename), url: req.file.path })
                
				const error = file.status && file
				if(error) return res.status(error.status).send(error.message)

				res.status(201).send(file)
            })
        } catch (error) {
            console.log(error)
            res.status(400).sendWithToken()
        }
    }

    static async get(req: Request, res: Response | any) {
		const file: any = await File.getById(req.body.id)

		const error = file.status && file
		if(error) return res.status(error.status).send(error.message)

		res.status(201).sendWithToken()
    }

    static async delete(req: Request, res: Response | any) {
        const error = await File.delete(req.body)

		if(error) return res.status(error.status).send(error.message)

		res.status(202).sendWithToken()
    }
}

const extractOriginalName = (name) => { 
	const splitName = name.split('-')
	const end = splitName.pop().split('.').pop()
	return splitName.join('-')+'.'+end
}