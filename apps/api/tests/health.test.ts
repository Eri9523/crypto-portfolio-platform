import request from "supertest";
import app from "../app";

describe("GET /health", () => {
    it("should response status ok and timestamp", async() => {
        const res = await request(app).get("/health");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("status", "ok");
        expect(res.body).toHaveProperty("timestamp");
        expect(typeof res.body.timestamp).toBe("string")
    })
})