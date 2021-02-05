import { Request, Response } from "express"
import modal from "../models/modal"
const path = require('path')

const controller = {
    getAll: async (req: Request, res: Response) => {
        res.send(await modal.getAll())
    },

    getImg: async (req: Request, res: Response) => {
        res.sendFile(path.resolve('public/assets/'+req.params.name))
    }
}

export default controller