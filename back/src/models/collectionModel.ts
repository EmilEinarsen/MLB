import { Connection, getConnection } from "typeorm"
import Collection from "../entity/Collection"

const con: Connection = getConnection()

const collectionModel = {
    create: async (payload: object) => {
        try {
            return await con.manager.save(
                con.manager.create(Collection, payload)
            )
        } catch (error) {
            console.log(error)
            return error
        }
    },

    get: async (payload: any) => {
        try {
            return await con.manager.findOne(Collection, { id: payload.id }, { relations: ['docs'] })
        } catch (error) {
            console.log(error)
            return error
        }
    },

    update: async (payload: any) => {
        try {
            const { id, ...subPayload } = payload
            const collection = await collectionModel.get({ id })

            Object.keys(subPayload).forEach(key => (collection[key] = subPayload[key]))
            
            return await con.manager.save(collection)

        } catch (error) {
            console.log(error)
            return error
        }
    },

    delete: async (payload: any) => {
        try {
            return await con.manager.delete(Collection, payload.id)
        } catch (error) {
            console.log(error)
            return error
        }
    },

    getAll: async () => {
        try {
            return await con.getRepository(Collection).find({ relations: ['docs'] })
        } catch (error) {
            console.log(error)
            return error
        }
    },
}

export default collectionModel