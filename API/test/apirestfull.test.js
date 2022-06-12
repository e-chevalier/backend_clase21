import supertest from 'supertest'
import chai from 'chai'
import { generateProduct } from './generador/productos.js'


const request = supertest('http://localhost:8080')
const expect = chai.expect

let prodIDAdd = 0


describe('test api rest full', () => {

    describe('GETALL', () => {

        it('deberia retornar un status 200', async () => {

            let response = await request.get('/api/productos')
            expect(response.status).to.eql(200)
        })

    })


    describe('GETBYID2', () => {

        it('deberia retornar el producto con ID: 2', async () => {

            let response = await request.get('/api/productos/2')
            expect(response.status).to.eql(200)

            const responseBody = response.body
            expect(responseBody).to.include.keys('status', 'products', 'isEmpty')

            expect(responseBody).to.eql({
                "status": "OK",
                "products": [
                    {
                        "id": 2,
                        "title": "Manzana Gala",
                        "price": 90,
                        "description": "Este tipo de manzana tiene una piel brillante a rayas o estrías rojas-anaranjadas sobre una base de color amarillenta.Se recomienda comer en crudo, pero también para cocer para hacer tartas y al horno.",
                        "thumbnail": "/assets/img/product/2.jpg",
                        "timestamp": 1644947630919,
                        "code": "Frutas",
                        "qty": 0,
                        "stock": 6
                    }
                ],
                "isEmpty": false
            })
        })

    })

    describe('POST', () => {

        it('deberia incorporar un producto', async () => {

            let product = generateProduct()
            //console.log(product)

            let response = await request.post('/api/productos').send(product)
            expect(response.status).to.eql(200)
            const prod = response.body
            //{ status: 'ok', id: 34 }
            prodIDAdd = response.body.id

        })
    })


    describe('UPDATE', () => {

        it('deberia actualizar valores del producto ingresado en el punto anterior.', async () => {


            let prodUpdateData= {
                "title": "Sandia Dulce",
                "description": "Sandia dulce y fresca para comer en este verano.",
                "code": "SummerFruit",
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_melancia-128.png",
                "price": "500",
                "qty": 0,
                "stock": "49",
                "timestamp": 1644965522273,
            }

            let response = await request.put(`/api/productos/${prodIDAdd}`).send(prodUpdateData)
            expect(response.status).to.eql(200)

            const responseBody = response.body
            expect(responseBody).to.include.keys('id')

            let response2 = await request.get(`/api/productos/${prodIDAdd}`)
            expect(response2.status).to.eql(200)
            const responseBody2 = response2.body

            expect(responseBody2).to.eql({
                "status": "OK",
                "products": [
                    {
                        "id": prodIDAdd,
                        "title": "Sandia Dulce",
                        "description": "Sandia dulce y fresca para comer en este verano.",
                        "code": "SummerFruit",
                        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_melancia-128.png",
                        "price": "500",
                        "qty": 0,
                        "stock": "49",
                        "timestamp": 1644965522273,
                    }
                ],
                "isEmpty": false
            })

        })
    })


    describe('DELETE', () => {

        it('deberia eleminar el producto anteriormente ingresado', async () => {

            let response = await request.delete(`/api/productos/${prodIDAdd}`)

            expect(response.status).to.eql(200)

            const responseBody = response.body
            expect(responseBody).to.include.keys('id')
            // Example: { status: 'ok', id: 34 }
        })
    })


    describe('DELETE2', () => {

        it(`Intento de eleminar un producto que no existe`, async () => {

            let response = await request.delete(`/api/productos/${prodIDAdd}`)
            expect(response.status).to.eql(200)
            const responseBody = response.body
            expect(responseBody).to.include.keys('error')

            expect(responseBody).to.eql({
                "error": "Producto no encontrado."
            })

        })
    })


})

