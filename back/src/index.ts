import "reflect-metadata"
import { createConnection } from "typeorm"


createConnection().then(async () => {
    import('./routes/routes')
})