import supertest from "supertest";
import { faker } from "@faker-js/faker";

import startApp from "../src";
import TestAgent from "supertest/lib/agent";
import MockDatabase from "./mocks/database.mock";
import mockServices from "./mocks/services";
import ErrorCodes from "../src/utils/constants/errorcodes";

const { app, server: Server } = startApp(new MockDatabase(), mockServices);

// Before running tests, initialise the request variable
let request: TestAgent | undefined;

const baseUrl = "/api/companies";

beforeAll(() => {
    request = supertest(app);
});
// After running all tests, make sure to close the server
afterAll(async () => {
    // Server.close(done);
    await new Promise<void>((resolve) => {
        Server?.close(() => {
            resolve();
        });
    });
});

describe("Test Company Routes", () => {
    it("GET / should return 404 (Page not found)", async () => {
        const res = await request?.get("/");
        expect(res?.statusCode).toEqual(404);
        expect(res?.text).toContain("Cannot GET");
    });
    // Test auth middleware
    it(`POST ${baseUrl} should fail with forbidden no user`, async () => {
        const res = await request!.post(baseUrl);

        expect(res.statusCode).toBe(ErrorCodes.Forbidden);
        expect(res.body?.message).toContain("Forbidden");
    });

    it(`GET ${baseUrl} should fail with forbidden no user`, async () => {
        const res = await request!.get(baseUrl);

        expect(res.statusCode).toBe(ErrorCodes.Forbidden);
        expect(res.body?.message).toContain("Forbidden");
    });

    // Add more tests for other routes here
    it(`POST ${baseUrl} should fail if owner is not passed`, async () => {
        const body = {
            name: faker.company.name(),
            subScription: {
                type: "Free",
                start: new Date(),
                end: new Date(),
            },
        };

        const res = await request?.post(baseUrl).send(body);

        const data = res?.body;

        expect(res?.statusCode).toBe(422);
        expect(data?.message?.message).toBe('"owner" is required');
    });

    it(`POST ${baseUrl} should successfully create a company even if representative is not passed`, async () => {
        const body = {
            name: faker.company.name(),
            owner: faker.internet.email(),
            subScription: {
                type: "Free",
                start: new Date(),
                end: new Date(),
            },
        };

        const res = await request?.post(baseUrl).send(body);

        expect(res?.statusCode).toBe(ErrorCodes.Success);
    });

    it(`POST ${baseUrl} should fail if all infos about representative is not passed`, async () => {
        const body = {
            name: faker.company.name(),
            owner: faker.internet.email(),
            subScription: {
                type: "Free",
                start: new Date(),
                end: new Date(),
            },
            representative: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: "+" + faker.string.numeric(9),
                address: faker.location.streetAddress(),
                position: faker.person.jobTitle(),
            },
        };

        const res = await request?.post(baseUrl).send(body);

        expect(res?.statusCode).toBe(ErrorCodes.ValidationError);
    });

    it(`POST ${baseUrl} should create a company with representative with more custom fields`, async () => {
        const body = {
            name: faker.company.name(),
            owner: faker.internet.email(),
            subScription: {
                type: "Free",
                start: new Date(),
                end: new Date(),
            },
            representative: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: "+" + faker.string.numeric(9),
                address: faker.location.streetAddress(),
                position: faker.person.jobTitle(),
                customField1: faker.string.alphanumeric(6),
                customField2: faker.string.alphanumeric(6),
            },
        };

        const res = await request?.post(baseUrl).send(body);

        expect(res?.statusCode).toBe(ErrorCodes.Success);
    });
});
