const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../../index")
const { sequelize } = require("../../models")

const secretKey = "secret";

const user = {
    "email": "dimas@gmail.com",
    "password": "dimas"
}

let user_id = ''
const photo_id = 1
let token = ''

const photoData = {
    title: "foto wisuda",
    caption: "akan menjadi kebanggaan keluarga",
    poster_image_url: "https://www.twitter.com/",
    user_id: user_id,
}

const failedData = {
    title: "foto wisuda",
    caption: "akan menjadi kebanggaan keluarga",
    poster_image_url: 9224534,
    user_id: "kafsd",
}

beforeAll(done => {
    request(app).post("/users/login")
        .send(user)
        .end((error, res) => {
            if (error) done(error)
            token = res.body.token
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    done(err)
                }
                user_id = decoded.id
            });
            done()
        })
})

describe('photo postPhoto', () => {
    it("should return 201", (done) => {
        request(app)
            .post('/photos')
            .set('authentication', `${token}`)
            .send(photoData)
            .then(res => {
                expect(res.status).toEqual(201)
                expect(typeof res.body).toEqual("object")
                expect(res.body.title).toEqual(photoData.title)
                expect(res.body.poster_image_url).toEqual(photoData.poster_image_url)
                expect(res.body.caption).toEqual(photoData.caption)
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    // it("should return 503 status code", (done) => {
    //     request(app).post("/photos")
    //         .set('authentication', `${ token }`)
    //         .send(failedData)
    //         .then(res => {
    //             expect(res.status).toEqual(503)
    //             expect(typeof res.body).toEqual("object")
    //             done()
    //         }).catch(error => {
    //             done(error)
    //         })
    // })
})



afterAll(done => {
    sequelize.queryInterface.bulkDelete('photos', null, {
            truncate: true,
            restartIdentity: true
        })
        .then(() => done())
        .catch(error => done(error))
})