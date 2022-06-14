const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../../index")
const { sequelize } = require("../../models")

const secretKey = "secret";

const userData = {
    "email": "dimas@gmail.com",
    "password": "dimas"
}

const dataRegistrasi = {
    full_name: "dimas",
    email: "dimas@gmail.com",
    username: "dimas",
    password: "dimas",
    profile_image_url: "https://github.com/",
    age: 45,
    phone_number: 3234534
}


describe('User register', () => {
    it("should return 200", (done) => {
        request(app)
            .post('/users/register')
            .send(dataRegistrasi)
            .then(res => {
                expect(res.status).toEqual(400)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 200", (done) => {
        request(app).post("/users/register")
            .send(dataRegistrasi)
            .end(res => {
                expext(res.status).toEqual(200)
                expext(typeof res.body).toEqual("object")
                done()
            })
    })
})


afterAll(done => {
    sequelize.queryInterface.bulkDelete('users', null, {
            truncate: true,
            restartIdentity: true
        })
        .then(() => done())
        .catch(error => done(error))
})