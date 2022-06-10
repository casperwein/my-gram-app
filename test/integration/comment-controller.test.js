const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../../index")
const { sequelize } = require("../../models")

const secretKey = "secret";

const adminUser = {
    "email": "kroos@gmail.com",
    "password": "kroos"
}

const comment = ''
let user_id = ''
const photo_id = 3
const comment_id = ''
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoia3Jvb3NAZ21haWwuY29tIiwiZnVsbF9uYW1lIjoia3Jvb3MiLCJ1c2VybmFtZSI6Imtyb29zIiwicHJvZmlsZV9pbWFnZV91cmwiOiJodHRwczovL2p3dC5pby8iLCJhZ2UiOjQ1LCJwaG9uZV9udW1iZXIiOjMyMzQ1MzQsImlhdCI6MTY1NDc2NDc4NSwiZXhwIjoxNjU0NzY4Mzg1fQ.iKgzVFeBGEiL1fLo2MY0JGAg1kJFr7MUq6ouBXo6W14'

const commentData = {
    comment: comment,
    user_id: user_id,
    photo_id: photo_id
}


beforeAll(done => {
    request(app).post("/users")
        .send(adminUser)
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


describe('comment post Comment', () => {
    it("should return 201 status code", (done) => {
        request(app).post("/comments")
            .set('authentication', `${ token }`)
            .send(commentData)
            .then(res => {
                comment_id = res.body.comment.id
                expect(res.status).toEqual(201)
                expect(typeof res.body).toEqual("object")
                expect(res.body.comment.photo_id).toEqual(comment.photo_id)
                expect(typeof res.body.comment.user_id).toEqual("number")
                expect(res.body.comment.comment).toEqual(commentData.comment)
                done()
            })
    })
})

afterAll(done => {
    sequelize.queryInterface.bulkDelete('comment', null, {
            truncate: true,
            restartIdentity: true
        })
        .then(() => done())
        .catch(error => done(error))
})