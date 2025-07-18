const request = require("supertest");
const app = require("../server");

describe("User auth test", () => {
  test("Signup", async () => {
    let res = await request(app)
      .post("/api/signup")
      .send({ email: "Test@gmail.com", password: "pass123" });
    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toBe("User is created.");
  });

  test("login", async () => {
    let res = await request(app)
      .post("/api/login")
      .send({ email: "Test@gmail.com", password: "pass123" });
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("User logged in");
    expect(res.body.token).toBeDefined();
  });
});
