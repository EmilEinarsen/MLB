import { Connection, getConnection } from "typeorm"
import Doc, { KEYS } from "../entity/Doc"
import Image from "../entity/Image"
import { User } from "../entity/User"
import imgModel from "./imgModel"

const con: Connection = getConnection()

const clean = (
    obj: object,
    keys: object = KEYS
) => {
    let cleaned = {}
    Object.keys(keys).forEach(key => obj[key] && (cleaned[key] = obj[key]))
    return cleaned
}

const docModel = {
    create: async (userId, payload: object) => {
        try {
			const user = await User.getById(userId)
            return await con.manager.save(
                con.manager.create(Doc, { ...clean(payload), user })
            )
        } catch (error) {
            console.log(error)
            return error
        }
    },

    get: async (payload: any) => {
        try {
            return await con.manager.findOne(Doc, { id: payload.id }, { relations: ['img'] })
        } catch (error) {
            console.log(error)
            return error
        }
    },

    update: async (payload: any) => {
        try {
            payload = clean(payload)
            let doc = await docModel.get(payload)

            payload.img && doc.img && await imgModel.delete({ img: doc.img })

            return await con.manager.update(Doc, doc.id, payload)
        } catch (error) {
            console.log(error)
            return error
        }
    },

    delete: async (payload: any) => {
        try {
            let doc = await docModel.get(payload)
            await imgModel.delete({ img: doc.img })
            return await con.manager.delete(Doc, doc.id)
        } catch (error) {
            console.log(error)
            return error
        }
    },

    createMult: async (userId, payload: Array<object>) => {
        try {
			if(!payload.length) throw 'Invalid payload type'
			const user = await User.getById(userId)
            const docs = []
            payload.forEach(doc => docs.push(con.manager.create(Doc, { ...clean(doc), user })))
            
            return await con.manager.save(docs)
        } catch (error) {
            console.log(error)
            return error
        }
    },

    getAll: async () => await con.getRepository(Doc).find({ relations: ['img'] }),

    deleteMult: async (payload: any) => {
        try {
            return await Promise.all(
                payload.ids.map(id => docModel.delete({ id })
            ))
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export default docModel