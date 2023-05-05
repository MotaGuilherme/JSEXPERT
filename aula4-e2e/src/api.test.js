const { describe, it} = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('Api Suite Test', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP Status 200', async ()=> {
            const response = await request(app)
                .get('/contact')
                .expect(200)
            assert.deepStrictEqual(response.text, 'contact us page')
        })
    })
})
    describe('/hello', () => {
        it('should request an inex=istent /hi and redirect to /hello', async ()=> {
            const response = await request(app)
                .get('/hi')
                .expect(200)
            assert.deepStrictEqual(response.text, 'Hello World')
        })
    })
    describe('/login', () => {
        it('should login successfully on the login route and return Status 200', async ()=> {
            const response = await request(app)
                .post('/login')
                .send({username: "Guilherme", password:"456"})
                .expect(200)
            assert.deepStrictEqual(response.text, 'Logging has succeeded')
        })

        it('should unauthorize a request when requesting it using wrong credentials and return HTTP status 401', async ()=> {
            const response = await request(app)
                .post('/login')
                .send({username: "GuilhermeAlves", password:"123"})
                .expect(401)

            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Logging Failed')
        })
    })
