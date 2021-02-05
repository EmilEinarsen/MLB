import docController from "../controllers/docController";

const docRoutes = [
    { method: 'post', path: '/doc/create', callback: docController.create },
    { method: 'post', path: '/doc/get', callback: docController.get },
    { method: 'post', path: '/doc/update', callback: docController.update },
    { method: 'post', path: '/doc/delete', callback: docController.delete },
    
    { method: 'get', path: '/doc/get_all', callback: docController.getAll }
]

export default docRoutes