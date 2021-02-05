import { Connection, getConnection } from "typeorm"
import Image from "../entity/Image"
import path from 'path'
import fs from 'fs'

const con: Connection = getConnection()

const imgModel = {
    create: async (payload: object) => {
        try {
            return await con.manager.save(
                con.manager.create(Image, payload)
            )
        } catch (error) {
            console.log(error)
            return error
        }
    },

    get: async (payload: any) => {
        try {
            return await con.manager.findOne(Image, { uid: payload.id })
        } catch (error) {
            console.log(error)
            return error
        }
    },

    delete: async (payload: any) => {
        try {
            let img = payload.img ?? await imgModel.get(payload)
            fs.unlinkSync(path.resolve('public/assets/' + img.name))
            return await con.manager.delete(Image, img.uid)
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export default imgModel