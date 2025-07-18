const request = require("supertest");
const app = require("../server");

test("Test route", async () => {
  let res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.body.msg).toBe("Everything is working fine");
});
