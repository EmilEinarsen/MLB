import { Connection, getConnection } from "typeorm"
import Doc from "../entity/Doc"
import collectionModel from "./CollectionModel"
import docModel from "./docModel"

const con: Connection = getConnection()

const modal = {
    getAll: async () => {
        let docs = await docModel.getAll()
        let collections = await collectionModel.getAll()
        
        return {
            docs,
            collections
        }
    }
}

export default modal