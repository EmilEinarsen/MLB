import DocController from "../controllers/DocController";
import { checkJwt } from "../middlewares/checkJwt";

const docRoutes = [
    { method: 'post', path: '/doc/create', middleware: [checkJwt], callback: DocController.create },
    { method: 'post', path: '/doc/get', middleware: [checkJwt], callback: DocController.get },
    { method: 'post', path: '/doc/update', middleware: [checkJwt], callback: DocController.update },
    { method: 'post', path: '/doc/delete', middleware: [checkJwt], callback: DocController.delete },
    
    { method: 'get', path: '/doc/get_all', middleware: [checkJwt], callback: DocController.getAll }
]

export default docRoutes