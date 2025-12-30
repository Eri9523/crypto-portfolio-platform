import request from "supertest";
import app from "../app";

describe("Auth API - Login", () => {
  beforeAll(async () => {
    await request(app).post("/api/auth/register").send({
      email: "hehehe@hahaha.com",
      password: "qwerty12345",
      name: "Paco",
    });
  });

  it("Should login with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "hehehe@hahaha.com",
      password: "qwerty12345",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body).toHaveProperty("user");

  });

  it("Should fail with invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "hehehe@hahaha.com",
      password: "superadmin1234",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message")
  });
});
