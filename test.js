const supertest = require("supertest");
const app = require("./app");

describe("Testing POSTS/auth/login endpoint", () => {
  it("should throw error message if user does not exists", async () => {
    const response = await supertest(app).post("/auth/login").send({
      email: "abc120@gmail.com",
      password: "abc124@gmail.com",
    });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Invalid email or password");
  });
});
