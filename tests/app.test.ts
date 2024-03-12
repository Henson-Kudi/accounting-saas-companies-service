import supertest from "supertest";
import { faker } from "@faker-js/faker";

import startApp from "../src/";
import TestAgent from "supertest/lib/agent";
import MockDatabase from "./mocks/database.mock";
import RepositoryLocator from "../src/use-cases";

const { app, server: Server } = startApp(
    new RepositoryLocator(new MockDatabase())
);

// Before running tests, initialise the request variable
let request: TestAgent | undefined;

const baseUrl = "/api/companies";

beforeAll(() => {
    request = supertest(app);
});
// After running all tests, make sure to close the server
afterAll((done) => {
    Server.close(done);
    // await new Promise<void>((resolve) => {
    //     Server?.close(() => {
    //         resolve();
    //     });
    // });
});

describe("Test Express Routes", () => {
    it("GET / should return 404 (Page not found)", async () => {
        const res = await request?.get("/");
        expect(res?.statusCode).toEqual(404);
        expect(res?.text).toContain("Cannot GET");
    });
    // Add more tests for other routes here
});

describe("TEST COMPANY CREATION ROUTES", () => {
    it("POST / should create a company successfully", async () => {
        const body = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: "1234@Abcd",
            repeatPassword: "1234@Abcd",
        };
        const res = await request?.post(`${baseUrl}/company-owners`).send(body);

        const data = res?.body;

        expect(data?.data?.name).toBe(body?.name);
    });
});
