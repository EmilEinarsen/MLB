import CollectionController from "../controllers/CollectionController"
import { checkJwt } from "../middlewares/checkJwt"

const collectionRoutes = [
    { method: 'post', path: '/collection/create', middleware: [checkJwt], callback: CollectionController.create },
    { method: 'post', path: '/collection/get', middleware: [checkJwt], callback: CollectionController.get },
    { method: 'post', path: '/collection/update', middleware: [checkJwt], callback: CollectionController.update },
    { method: 'post', path: '/collection/delete', middleware: [checkJwt], callback: CollectionController.delete },

    { method: 'get', path: '/collection/get_all', middleware: [checkJwt], callback: CollectionController.getAll },
]

export default collectionRoutes