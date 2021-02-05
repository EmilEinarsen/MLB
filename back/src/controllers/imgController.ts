import { Request, Response } from "express"
import imgModel from "../models/imgModel"
import upload from "../utils/fileStorage"

const imgController = {
    create: async (req: any, res: Response) => {
        try {
            upload.single('image')(req, res, async () => {
                let img = await imgModel.create({ name: req.file.filename, url: req.file.path })
                res.send(img)
            })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    },

    get: async (req: Request, res: Response) => {
        try {
            res.send(await imgModel.get({ id: req.body.id }))
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            res.send(await imgModel.delete({ id: req.body.id }))
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

export default imgController