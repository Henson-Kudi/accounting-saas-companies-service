import supertest from "supertest";
import { faker } from "@faker-js/faker";

import startApp from "../src/";
import TestAgent from "supertest/lib/agent";
import MockDatabase from "./mocks/database.mock";
import mockServices from "./mocks/services";

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

describe("Test CompanyOwner Routes", () => {
    const url = `${baseUrl}/register-owner`;
    const password = "1234@Abcd";

    it(`POST ${url} should return invalid contact details (Main contact is required)`, async () => {
        const data = {
            name: faker.person.firstName(),
            email: faker.internet.email().toLowerCase(),
            addresses: [
                {
                    type: "Home",
                    line1: faker.location.street(),
                },
            ],
            contacts: [
                {
                    type: "Home",
                    phone: "+" + faker.string.numeric(12),
                },
            ],
            password: password,
            repeatPassword: password,
        };

        const res = await request?.post(url).send(data);

        expect(res?.statusCode).toBe(422);
        expect(res?.body?.message?.message).toBe(
            'At least one contact with type "Main" must exist.'
        );
    });

    it(`POST to ${url} should reurn password and repeatPassword must match`, async () => {
        try {
            const data = {
                name: faker.person.firstName(),
                email: faker.internet.email().toLowerCase(),
                addresses: [
                    {
                        type: "Home",
                        line1: faker.location.street(),
                    },
                ],
                contacts: [
                    {
                        type: "Main",
                        phone: "+" + faker.string.numeric(12),
                    },
                ],
                password: password,
                repeatPassword: "inCorrect@34321",
            };

            const res = await request?.post(url).send(data);

            expect(res?.statusCode).toBe(422);
            expect(res?.body?.message?.message?.toLowerCase()).toBe(
                "passwords do not match"
            );
        } catch (err) {
            console.log(err);
        }
    });

    // Add more tests for other routes here
});
