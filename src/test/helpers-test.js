const supertest = require("supertest")
const { app } = require("../index")
const api = supertest(app)

const SignupHelper = async (data) => {
    console.log(data);
    const res = await api
        .post("/signup")
        .set("Content-type", "application/json")
        .send(data)
    
    return res
}
module.exports = { SignupHelper }