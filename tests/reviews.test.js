
require("dotenv").config({
    path: "./config/config.env",
  });
const request = require("supertest");
const baseURL = `${process.env.LOCAL_URL}/api/v1/reviews`



describe("Get Reviews", () => {
  
  it("When no parameters are entered", async () => {
    const response=await request(baseURL).get("/").send()
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('count',8);
    expect(response.body.success).toBe(true);
  });

  it("When some- parameters are entered", async () => {
    const response=await request(process.env.LOCAL_URL).get("/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews").send()
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
      expect(response.body.error).toBe("No review found with the id of 634f7ec9771853324f1390a2");
    });

    it("When Correct Details are entered", async () => {
        const response=await request(baseURL).get("/5d7a514b5d2c12c7449be023").send()
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty("_id");
    })
    
});

