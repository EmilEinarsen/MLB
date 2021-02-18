import controller from "../controllers/Controller"
import FileController from "../controllers/FileController"
import { checkJwt } from "../middlewares/checkJwt"

const fileRoutes = [
    { method: 'get', path: '/public/assets/:type/:name', callback: controller.getFile },
    { method: 'post', path: '/img/create', middleware: [checkJwt], callback: FileController.create },
    { method: 'post', path: '/img/delete', middleware: [checkJwt], callback: FileController.delete },
]

export default fileRoutes