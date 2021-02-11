import UserController from "../controllers/UserController"
import { checkJwt } from "../middlewares/checkJwt"

const userRoutes = [
	{ method: 'post', path: '/user/create', callback: UserController.create },
	{ method: 'post', path: '/user/get', middleware: [checkJwt], callback: UserController.get },
    { method: 'post', path: '/user/update', middleware: [checkJwt], callback: UserController.update },
	{ method: 'post', path: '/user/delete', middleware: [checkJwt], callback: UserController.delete },
	
	{ method: 'get', path: '/user/get_all', callback: UserController.getAll },
]

export default userRoutes


