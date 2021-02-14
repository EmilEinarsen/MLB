import { Request, Response } from "express"
import Collection from "../entity/Collection"
import Doc from "../entity/Doc"

export default class CollectionController {
	static async create(req: Request, res: Response | any) {
		const 
			userId = res.locals.jwtPayload.userId,
			payload = req.body
			
		await replaceDocIdsWithDocs(payload)

		const result: any = !payload.length 
            ? await Collection.create(userId, payload) 
            : await Collection.createMult(userId, payload)

		const error = result.status && result
		if(error) return res.status(error.status).send(error.message)

        res.sendWithToken(result)
    }

    static async get(req: Request, res: Response | any) {
        let result: any = await Collection.getById(req.body.id)

		const error = result.status && result
		if(error) return res.status(error.status).send(error.message)

        res.sendWithToken(result)
    }

    static async update(req: Request, res: Response | any) {
        const payload = req.body

		await replaceDocIdsWithDocs(payload)
		
        const error = await Collection.update(payload)
		if(error) return res.status(error.status).send(error.message)

        res.sendWithToken()
    }

    static async delete(req: Request, res: Response | any) {
        const error = await Collection.delete(req.body.id)
		if(error) return res.status(error.status).send(error.message)

        res.sendWithToken()
    }

    static async getAll(req: Request, res: Response | any) {
        let result = await Collection.getAll()
        
        res.sendWithToken(result)
    }
}

const replaceDocIdsWithDocs = async (payload) => {
	payload.length 
		? await Promise.all(payload.map(part=>replace(part)))
		: await replace(payload)
}

const replace = async (part) => part.docIds && (
	part.docs = await Promise.all(
		part.docIds.map((docId) => Doc.getById(docId))
	),
	delete part.docIds
)