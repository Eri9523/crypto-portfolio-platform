import request from "supertest";
import app from "../app";

describe("Auth API - Register", () => {
    it("Should register a new user", async () => {
        const res = await request(app)
        .post("/api/auth/register")
        .send({
            email: "charmander@pokemon.com",
            password: "charmanderteam",
            name: "Test User"
        });

        console.log(res.body)
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("user");
        expect(res.body.user).toHaveProperty("email", "charmander@pokemon.com")
    })
})