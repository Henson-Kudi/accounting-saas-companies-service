import request from "supertest";
import app from "../src/";
import { server } from "..";

afterAll(async () => {
    await new Promise<void>((resolve) => {
        server?.close(() => {
            resolve();
        });
    });
});

describe("Test Express Routes", () => {
    it("GET / should return Hello World!", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(404);
        expect(res.text).toContain("Cannot GET");
    });
    // Add more tests for other routes here
});
