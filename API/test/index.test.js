import Todos from './Todos.js'
import assert from 'assert/strict'
import fs from 'fs'


describe('test de integracion de tareas', function() {

    it('deberia crear el contenedor de tareas vacio', function() {
        const todos = new Todos()
        assert.strictEqual(todos.list().length, 0)
    })

    it('deberia adicionar tareas correctamente', function() {
        const todos = new Todos()

        todos.add('run code')
        assert.strictEqual(todos.list().length, 1)
        assert.deepStrictEqual(todos.list(), [ { title: 'run code', complete: false } ])

        todos.add('Otra tarea')
        assert.strictEqual(todos.list().length, 2)
        assert.deepStrictEqual(todos.list(),[
            { title: 'run code', complete: false },
            { title: 'Otra tarea', complete: false }
        ])
    })

    it('deberia marcar una tarea como completada', function() {

        const todos = new Todos()

        todos.add("run code")
        todos.add('Otra tarea')
        todos.complete("run code")

        assert.deepStrictEqual(todos.list(),
        [
            { title: 'run code', complete: true },
            { title: 'Otra tarea', complete: false }
        ])

    })

})


describe('comprobar error al completar tarea inexistente', function() {

    it('deberia dar error cuando no hay tareas cargadas', function() {
        const todos = new Todos()

        const errorEsperado = new Error('There are no tasks to do.')
        assert.throws(() => {
            todos.complete('una tarea mas')
        }, errorEsperado)

    })

    it('deberia dar error cuando la tarea a completar no existe', function() {
        const todos = new Todos()
        todos.add('run code')

        const errorEsperado = new Error('Task not found.')
        assert.throws(() => {
            todos.complete('una tarea mas')
        }, errorEsperado)

    })


})

describe("comprobando que saveToFileCb() funcione bien", function() {

    it("deberia guardar una tarea en el archivo todos.txt", function(done) {
        const todos = new Todos()
        todos.add('guardar tarea callback')
        todos.saveToFileCb( err => {
            assert.strictEqual(fs.existsSync('todos.txt'), true)
            let expectedContent = 'guardar tarea callback,false'
            let content = fs.readFileSync('todos.txt').toString()
            assert.strictEqual(content, expectedContent)
            done(err)
        })

    })

})

describe("comprobando que saveToFilePromises() funcione bien", function() {

    before(
        function() {
            console.log('\n********** Comienzo TOTAL del Test **********')
        }
    )

    after(
        function() {
            console.log('\n********** FIN TOTAL del Test **********')
        }
    )

    beforeEach(
        function() {
            console.log('\n********** COMIENZO Test **********')
        }
    )

    beforeEach(
        function() {
            this.todos = new Todos()
        }
    )

    afterEach(
        function() {
            if(fs.existsSync('todos.txt')) {
                fs.unlinkSync('todos.txt')
            }
        }
    )

    afterEach(
        function() {
            console.log('********** Fin test **********\n')
        }
    )

    it('deberia guardar una tarea en el archivo todos.txt (then/catch)', function() {
        this.todos.add('guardar tarea Promises TC')
        return this.todos.saveToFilePromise().then( () => {
            assert.strictEqual(fs.existsSync('todos.txt'), true)
            let expectedContent = 'guardar tarea Promises TC,false'
            let content = fs.readFileSync('todos.txt').toString()
            assert.strictEqual(content, expectedContent)
        })
    })

    it('deberia guardar una tarea en el archivo todos.txt (async/await)', async function() {

        this.todos.add('guardar tarea Promises AA')

        await this.todos.saveToFilePromise()

        assert.strictEqual(fs.existsSync('todos.txt'), true)
        let expectedContent = 'guardar tarea Promises AA,false'
        let content = fs.readFileSync('todos.txt').toString()
        assert.strictEqual(content, expectedContent)

    })

})

