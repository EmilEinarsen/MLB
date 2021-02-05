import { Request, Response } from "express"
import docModel from "../models/docModel"
import imgModel from "../models/imgModel"
import upload from "../utils/fileStorage"

const docController = {
    create: async (req: Request, res: Response) => {
        let result = !req.body.length 
            ? await docModel.create(req.body) 
            : await docModel.createMult(req.body)

        res.send(result)
    },

    get: async (req: Request, res: Response) => {
        let result = await docModel.get(req.body)

        res.send(result)
    },

    update: async (req: Request, res: Response) => {
        let img = req.body.imgUid && await imgModel.get({ id: req.body.imgUid })
        console.log(img ? { ...req.body, img } : req.body)
        let result = await docModel.update(img ? { ...req.body, img } : req.body)

        res.send(result)
    },

    delete: async (req: Request, res: Response) => {
        let result = 
            req.body.id ? await docModel.delete(req.body) 
            : req.body.ids ? await docModel.deleteMult(req.body)
            : 'Invalid request'

        res.send(result)
    },

    getAll: async (req: Request, res: Response) => {
        let result = await docModel.getAll()
        
        res.send(result)
    }
}

export default docController