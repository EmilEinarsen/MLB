import docController from "../controllers/docController";
import { checkJwt } from "../middlewares/checkJwt";

const docRoutes = [
    { method: 'post', path: '/doc/create', middleware: [checkJwt], callback: docController.create },
    { method: 'post', path: '/doc/get', middleware: [checkJwt], callback: docController.get },
    { method: 'post', path: '/doc/update', middleware: [checkJwt], callback: docController.update },
    { method: 'post', path: '/doc/delete', middleware: [checkJwt], callback: docController.delete },
    
    { method: 'get', path: '/doc/get_all', middleware: [checkJwt], callback: docController.getAll }
]

export default docRoutes