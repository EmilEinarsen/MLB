import { Request, Response } from "express"
import collectionModel from "../models/CollectionModel"
import docModel from "../models/docModel"

const docController = {
    create: async (req: Request, res: Response) => {
        const { docIds, ...subBody } = req.body
        let result = await collectionModel.create(
            docIds ? {
                docs: await Promise.all(
                    docIds.map((docId) => docModel.get({ id: docId }))
                ),
                ...subBody
            } : req.body
        )

        res.send(result)
    },

    get: async (req: Request, res: Response) => {
        let result = await collectionModel.get(req.body)

        res.send(result)
    },

    update: async (req: Request, res: Response) => {
        const { docIds, ...subBody } = req.body
        console.log(docIds ? { ...subBody, docs: docIds } : req.body)
        let result = await collectionModel.update(
            docIds ? { 
                ...subBody, 
                docs: await Promise.all(
                    docIds.map((docId: string) => docModel.get({ id: docId }))
                ) 
            } : req.body)

        res.send(result)
    },

    delete: async (req: Request, res: Response) => {
        let result = await collectionModel.delete(req.body)

        res.send(result)
    },

    getAll: async (req: Request, res: Response) => {
        let result = await collectionModel.getAll()
        
        res.send(result)
    }
}

export default docController