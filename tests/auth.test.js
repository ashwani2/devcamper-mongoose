
require("dotenv").config({
  path: "./config/config.env",
});
const request = require("supertest");
const baseURL = `${process.env.LOCAL_URL}/api/v1/auth`

// describe("Register", () => {
  
//   it(" All the correct Details are entered", async () => {
//     const response=await request(baseURL).post("/register").send({
//         name: "pk",
//         email: "h@email.com",
//         password: "1233444",
//         role: "publisher",
//       })
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('token');
//   });
// });

describe("Login", () => {
  
  it("Details are not entered", async () => {
    const response=await request(baseURL).post("/login").send()
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Please Provide a email and password');
  });

  it("Username is wrong", async () => {
    const response=await request(baseURL).post("/login").send({
      email:"himmat@email.com",
      password:"12345"
    })
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid Credentials');
  });

  it("Password is wrong", async () => {
    const response=await request(baseURL).post("/login").send({
      email:"h@email.com",
      password:"12345"
    })
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid Credentials');
  })

  it("Details are Correct", async () => {
    const response=await request(baseURL).post("/login").send({
      email:"h@email.com",
      password:"1233444"
    })
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.success).toBe(true);
  })
});
