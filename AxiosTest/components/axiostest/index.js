import express from 'express'
import { axiostestController } from './controllers/axiostestController.js'

export const axiostest = (app) => {

    let router = express.Router()
    app.use('/api/axiostest', router)

    router.get('/all', axiostestController.getAllTest)
    router.get('/:id?', axiostestController.getProduct)
    router.post('/', axiostestController.postProduct)
    router.put('/:id', axiostestController.putProduct)
    router.delete('/:id', axiostestController.deleteProduct)
    router.get('/all', axiostestController.getAllTest)


}
