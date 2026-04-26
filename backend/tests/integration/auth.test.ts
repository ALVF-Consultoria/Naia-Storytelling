import request from "supertest";
import app from "../../src/app";
import { setupTestDB, teardownTestDB, TestDataSource } from "../setup/test-db";

// Override the real Data Source with our Fake Memory one
jest.mock("../../src/config/data-source", () => {
    const { TestDataSource } = require("../setup/test-db");
    return {
        AppDataSource: {
            getRepository: (entity: any) => TestDataSource.getRepository(entity),
            initialize: () => Promise.resolve()
        }
    };
});

describe("Auth Endpoints (Integration)", () => {
    beforeAll(async () => {
        await setupTestDB();
        process.env.JWT_SECRET = "integration_secret";
    });

    afterAll(async () => {
        await teardownTestDB();
    });

    describe("POST /api/auth/register", () => {
        it("should successfully register a new user in the SQLite DB", async () => {
            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    username: "Integration_Hero",
                    email: "hero@integration.com",
                    password: "strongpassword"
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("message", "User registered successfully");
            expect(res.body).toHaveProperty("id");
        });

        it("should return 400 when registering same email", async () => {
            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    username: "Another",
                    email: "hero@integration.com",
                    password: "123"
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("error", "Este email já está em uso.");
        });
    });

    describe("POST /api/auth/login", () => {
        it("should log in and return a valid JWT token", async () => {
            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "hero@integration.com",
                    password: "strongpassword"
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("message", "Login successful");
            expect(res.body).toHaveProperty("token");
            expect(res.body.user).toHaveProperty("email", "hero@integration.com");
        });

        it("should return 401 for wrong credentials", async () => {
            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "hero@integration.com",
                    password: "wrong"
                });

            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty("error", "Invalid credentials");
        });
    });
});
