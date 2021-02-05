import express, { Application } from 'express'
import cors from 'cors'
import controller from '../controllers/controller'
import docRoutes from './docRoutes'
import imgRoutes from './imgRoutes'
import collectionRoutes from './collectionRoutes'

const app: Application = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.listen(port, () => console.log('Port: ' + port))

const routes = [
    { method: 'get', path: '/', callback: controller.getAll },
    ...docRoutes,
    ...imgRoutes,
    ...collectionRoutes,
]
routes.forEach(
    ({ method, path, callback }) => app[method](path, callback)
)