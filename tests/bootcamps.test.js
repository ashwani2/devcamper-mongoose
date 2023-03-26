
require("dotenv").config({
    path: "./config/config.env",
  });
const request = require("supertest");
const baseURL = `${process.env.LOCAL_URL}/api/v1/bootcamps`



describe("Get Bootcamps", () => {
  
  it("When no parameters are entered", async () => {
    const response=await request(baseURL).get("/").send()
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('count',4);
    expect(response.body.success).toBe(true);
  });

  it("When some- parameters are entered", async () => {
    const response=await request(baseURL).get("?select=name,description,housing&sort=name&page=2&limit=2").send()
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('count',2);
    expect(response.body.data).toHaveLength(2);
  });

});

describe("Get Single Bootcamp", () => {
  
    it("When Wrong Bootcamp Id is entered", async () => {
      const response=await request(baseURL).get("/634f7ec9771853324f1390a2").send()
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("BootCamp not found with id of 634f7ec9771853324f1390a2");
    });

    it("When Correct Details are entered", async () => {
        const response=await request(baseURL).get("/5d713995b721c3bb38c1f5d0").send()
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty("_id");
    })
    
});

describe("Get Bootcamps By Distance", () => {
  
    it("When Wrong Zipcode is entered", async () => {
      const response=await request(baseURL).get("/radius/10059/30").send()
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    });
   
});
