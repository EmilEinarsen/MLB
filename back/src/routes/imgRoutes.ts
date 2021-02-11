import controller from "../controllers/Controller"
import imgController from "../controllers/imgController"
import { checkJwt } from "../middlewares/checkJwt"

const imgRoutes = [
    { method: 'get', path: '/img/get/:name', callback: controller.getImg },
    { method: 'post', path: '/img/create', middleware: [checkJwt], callback: imgController.create },
    { method: 'post', path: '/img/delete', middleware: [checkJwt], callback: imgController.delete },
]

export default imgRoutes