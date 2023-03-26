
require("dotenv").config({
    path: "./config/config.env",
  });
const request = require("supertest");
const baseURL = `${process.env.LOCAL_URL}/api/v1/courses`



describe("Get Courses", () => {
  
  it("When no parameters are entered", async () => {
    const response=await request(baseURL).get("/").send()
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('count',9);
    expect(response.body.success).toBe(true);
  });

  it("When some- parameters are entered", async () => {
    const response=await request(process.env.LOCAL_URL).get("/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses").send()
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('count',2);
    expect(response.body.data).toHaveLength(2);
  });

});

describe("Get A Single Course", () => {
  
    it("When no parameters are entered", async () => {
      const response=await request(baseURL).get("/").send()
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('count',9);
      expect(response.body.success).toBe(true);
    });
  
    it("When some- parameters are entered", async () => {
      const response=await request(process.env.LOCAL_URL).get("/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses").send()
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('count',2);
      expect(response.body.data).toHaveLength(2);
    });
  
  });