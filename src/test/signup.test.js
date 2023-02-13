const mongoose = require("mongoose")
const { server } = require("../index")
const Users = require("../models/users")
const { SignupHelper } = require("./helpers-test")
describe("TEST SIGNUP", () => {
    test('/signup correct-data', async () => {
        const res = await SignupHelper({
            nameUser: "bruno",
            password: "password",
            fullName: "Bruno Pereyra",
            Gmail: "brunopereyra459@gmail.com"
        })
        const user = await Users.findOne({ Gmail: "brunopereyra459@gmail.com" })
        expect(res.body.res.Gmail).toBe(user.Gmail)
        expect(res.statusCode).toBe(201);

    })
    test("/signup incorrect data", async () => {
        expect(res.body.res.Gmail).toBe()
        expect(res.statusCode).toBe(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})