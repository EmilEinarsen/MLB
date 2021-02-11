import collectionController from "../controllers/collectionController"
import { checkJwt } from "../middlewares/checkJwt"

const collectionRoutes = [
    { method: 'post', path: '/collection/create', middleware: [checkJwt], callback: collectionController.create },
    { method: 'post', path: '/collection/get', middleware: [checkJwt], callback: collectionController.get },
    { method: 'post', path: '/collection/update', middleware: [checkJwt], callback: collectionController.update },
    { method: 'post', path: '/collection/delete', middleware: [checkJwt], callback: collectionController.delete },

    { method: 'get', path: '/collection/get_all', middleware: [checkJwt], callback: collectionController.getAll },
]

export default collectionRoutes