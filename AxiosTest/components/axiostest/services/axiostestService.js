import axios from 'axios'

class Axiostest {

    async getProduct(id) {
        try {
            let response = await axios.get(`http://localhost:8080/api/productos${id?'/'+id:''}`)
            return { status: "OK", response: response.data }
        } catch (error) {
            console.log(error);
        }
    }

    async postProduct() {
        try {

            let newProd = 
                {
                    title: "Pera Loca",
                    description: "Pera dulce y fresca para comer en este verano.",
                    code: "SummerFruit",
                    thumbnail: "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_abacate-128.png",
                    price: "250",
                    stock: "59"
                }

            let response = await axios.post(`http://localhost:8080/api/productos`, newProd)
            
            return { status: "OK", response: response.data }
        } catch (error) {
            console.log(error);
        }
    }


    async deleteProduct(id) {
        try {

            let response = await axios.delete(`http://localhost:8080/api/productos/${id}`)
            
            return { status: "OK", response: response.data }
        } catch (error) {
            console.log(error);
        }
    }


    async putProduct(id) {
        try {

            let updateProd = 
            {
                "title": "Sandia Dulce",
                "description": "Sandia dulce y fresca para comer en este verano.",
                "code": "SummerFruit",
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_melancia-128.png",
                "price": "500",
                "stock": "49",
            }


            let response = await axios.put(`http://localhost:8080/api/productos/${id}`, updateProd)
            
            return { status: "OK", response: response.data }
        } catch (error) {
            console.log(error);
        }
    }

    async getAllTest() {
        try {

            let responseGetProduct = await this.getProduct()
            let responseGetProductWithId = await this.getProduct(2)
            let responsePostProduct = await this.postProduct()
            let responseGetProductFromLastPost = await this.getProduct(responsePostProduct.response.id)
            let responsePutProduct = await this.putProduct(responsePostProduct.response.id)
            let responseGetProductFromLastPut = await this.getProduct(responsePostProduct.response.id)
            let responseDeleteProduct = await this.deleteProduct(responsePostProduct.response.id)
            let responseGetProductDeleted = await this.getProduct(responsePostProduct.response.id)


            
            return { 
                status: "OK", 
                responses: 
                    {
                        getAllProduct: responseGetProduct,
                        getProductWithId2: responseGetProductWithId,
                        postProduct: responsePostProduct,
                        id: responsePostProduct.response.id,
                        getProductFromLastPost: responseGetProductFromLastPost,
                        putProductFormLasPost: responsePutProduct,
                        getProductFormLasPut: responseGetProductFromLastPut,
                        deleteProduct: responseDeleteProduct,
                        getProductDeleted: responseGetProductDeleted
                    }
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export let axiostestService = new Axiostest()