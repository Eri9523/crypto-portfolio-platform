import request from "supertest"
import app from "../app";

describe("Auth API", () => {
    describe("POST /api/auth/login", ()=> {
        it("Should fail with invalid credentials", async () => {
            const res = await request(app).post("/api/auth/login").send({email: "fake@example.com", password: "wrongpass"})

            expect(res.statusCode).toBe(401)
            expect(res.body).toHaveProperty("message");
        }, 15000)
    })
})