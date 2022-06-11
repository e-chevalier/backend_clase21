import { axiostestService } from '../services/axiostestService.js'


class Axiostest {

    async getProduct(req, res, next) {
        try {
            let {status, response } = await axiostestService.getProduct(req.params.id)
            res.json({ status: status, response: response  })
            
        } catch (error) {
            console.log(error);
        }
    }

    async postProduct(req, res, next) {
        try {
            let {status, response } = await axiostestService.postProduct()
            res.json({ status: status, response: response  })
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            let {status, response } = await axiostestService.deleteProduct(req.params.id)
            res.json({ status: status, response: response  })
            
        } catch (error) {
            console.log(error);
        }
    }

    async putProduct(req, res, next) {
        try {
            let {status, response } = await axiostestService.putProduct(req.params.id)
            res.json({ status: status, response: response  })
            
        } catch (error) {
            console.log(error);
        }
    }

    async getAllTest(req, res, next) {
        try {
            let {status, responses } = await axiostestService.getAllTest()
            res.json({ status: status, responses: responses  })
            
        } catch (error) {
            console.log(error);
        }
    }

}

export let axiostestController = new Axiostest()
