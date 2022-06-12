import supertest from 'supertest'
import chai from 'chai'
import { generateProduct } from './generador/productos.js'


const request = supertest('http://localhost:8080')
const expect = chai.expect

let prodIDAdd = 0


describe('test api rest full', () => {

    describe('GET', () => {

        it('deberia retornar un status 200', async () => {

            let response = await request.get('/api/productos')
            expect(response.status).to.eql(200)
        })

    })

    describe('POST', () => {

        it('deberia incorporar un producto', async () => {

            let product = generateProduct()

            console.log(product)

            let response = await request.post('/api/productos').send(product)

            expect(response.status).to.eql(200)

            const prod = response.body

            prodIDAdd = response.body.id
            //{ status: 'ok', id: 34 }

            console.log(prodIDAdd)

        })
    })

    describe('DELETE', () => {

        it('deberia eleminar un producto', async () => {

            let response = await request.delete(`/api/productos/${prodIDAdd}`)

            expect(response.status).to.eql(200)

            const prod = response.body
            //{ status: 'ok', id: 34 }
            
            console.log(prod)

        })
    })


})

