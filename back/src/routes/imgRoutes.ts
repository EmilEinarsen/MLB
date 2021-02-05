import controller from "../controllers/controller"
import imgController from "../controllers/imgController"

const imgRoutes = [
    { method: 'get', path: '/img/get/:name', callback: controller.getImg },
    { method: 'post', path: '/img/create', callback: imgController.create },
    { method: 'post', path: '/img/delete', callback: imgController.delete },
]

export default imgRoutes