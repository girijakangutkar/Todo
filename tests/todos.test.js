const request = require("supertest");
const app = require("../server");
const jwt = require("jsonwebtoken");

let token;
let userId;
let todoId;

beforeAll(async () => {
  await request(app)
    .post("/api/signup")
    .send({ email: "Test@gmail.com", password: "pass123" });

  const res = await request(app)
    .post("/api/login")
    .send({ email: "Test@gmail.com", password: "pass123" });

  console.log("Login response body:", res.body);

  token = res.body.token;
  expect(token).toBeDefined();

  const decoded = jwt.decode(token);
  userId = decoded.userId;
});

describe("Todo API testing", () => {
  test("Get ToDo", async () => {
    const res = await request(app)
      .get("/app/todos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Success");
    expect(res.body.todo).toBeDefined();
  });

  test("Post todo", async () => {
    const res = await request(app)
      .post("/app/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Make toast",
        description: "Make crunchy",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toBe("todo added");
    expect(res.body.addData).toMatchObject({
      title: "Make toast",
      description: "Make crunchy",
      createdBy: userId,
    });

    todoId = res.body.addData._id;
  });

  test("Update todo", async () => {
    const res = await request(app)
      .put(`/app/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Make toast updated",
        description: "Extra crunchy",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("todo updated");
    expect(res.body.data).toMatchObject({
      title: "Make toast updated",
      description: "Extra crunchy",
    });
  });

  test("Delete todo", async () => {
    const res = await request(app)
      .delete(`/app/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Deleted successfully");
  });
});
