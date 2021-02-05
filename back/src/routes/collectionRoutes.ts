import collectionController from "../controllers/collectionController"

const collectionRoutes = [
    { method: 'post', path: '/collection/create', callback: collectionController.create },
    { method: 'post', path: '/collection/get', callback: collectionController.get },
    { method: 'post', path: '/collection/update', callback: collectionController.update },
    { method: 'post', path: '/collection/delete', callback: collectionController.delete },

    { method: 'get', path: '/collection/get_all', callback: collectionController.getAll },
]

export default collectionRoutes