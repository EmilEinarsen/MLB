import express, { Application } from 'express'
import cors from 'cors'
import Controller from '../controllers/Controller'
import docRoutes from './docRoutes'
import fileRoutes from './fileRoutes'
import collectionRoutes from './collectionRoutes'
import userRoutes from './userRoutes'
import { checkJwt } from '../middlewares/checkJwt'

const app: Application = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.listen(port, () => console.log('Port: ' + port))

interface Route {
	method: string
	path: string
	middleware?: any
	callback: any
}

const routes: Route[] = [
	{ method: 'get', path: '/', middleware: [checkJwt], callback: Controller.getAll },
	{ method: 'post', path: '/login', callback: Controller.login },
    ...docRoutes,
    ...fileRoutes,
	...collectionRoutes,
	...userRoutes,
]
routes.forEach(
    ({ method, path, middleware, callback }) => middleware ? app[method](path, middleware, callback) : app[method](path, callback)
)