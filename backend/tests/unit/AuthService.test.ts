import { AuthService } from "../../src/services/AuthService";
import { UserRepository } from "../../src/repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mocks
jest.mock("../../src/repositories/UserRepository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("AuthService (Unit)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = "test_secret";
    });

    describe("Register", () => {
        it("should throw an error if username already exists", async () => {
            (UserRepository.findByUsername as jest.Mock).mockResolvedValueOnce({ id: 1, username: "Test" });

            await expect(AuthService.register({ username: "Test", email: "test@test.com", password: "123" }))
                .rejects.toThrow("Este username já está em uso.");
        });

        it("should throw an error if email already exists", async () => {
            (UserRepository.findByUsername as jest.Mock).mockResolvedValueOnce(null);
            (UserRepository.findByEmail as jest.Mock).mockResolvedValueOnce({ id: 1, email: "test@test.com" });

            await expect(AuthService.register({ username: "Test", email: "test@test.com", password: "123" }))
                .rejects.toThrow("Este email já está em uso.");
        });

        it("should hash the password and save the user", async () => {
            (UserRepository.findByEmail as jest.Mock).mockResolvedValueOnce(null);
            (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashed_password");
            
            const fakeUser = { id: 1, username: "Test", email: "test@test.com", password: "hashed_password" };
            (UserRepository.create as jest.Mock).mockReturnValue(fakeUser);
            (UserRepository.save as jest.Mock).mockResolvedValueOnce(fakeUser);

            const result = await AuthService.register({ username: "Test", email: "test@test.com", password: "123" });

            expect(bcrypt.hash).toHaveBeenCalledWith("123", 10);
            expect(UserRepository.save).toHaveBeenCalledWith(fakeUser);
            expect(result).toHaveProperty("message", "User registered successfully");
            expect(result).toHaveProperty("id", 1);
        });
    });

    describe("Login", () => {
        it("should throw error for invalid email", async () => {
            (UserRepository.findByEmail as jest.Mock).mockResolvedValueOnce(null);

            await expect(AuthService.login({ email: "wrong@test.com", password: "123" }))
                .rejects.toThrow("Invalid credentials");
        });

        it("should throw error for wrong password", async () => {
            (UserRepository.findByEmail as jest.Mock).mockResolvedValueOnce({ id: 1, email: "test@test.com", password: "hashed" });
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

            await expect(AuthService.login({ email: "test@test.com", password: "wrong" }))
                .rejects.toThrow("Invalid credentials");
        });

        it("should return token and user data on success", async () => {
            const fakeUser = { id: 1, username: "Test", email: "test@test.com", password: "hashed" };
            (UserRepository.findByEmail as jest.Mock).mockResolvedValueOnce(fakeUser);
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
            (jwt.sign as jest.Mock).mockReturnValueOnce("fake_token");

            const result = await AuthService.login({ email: "test@test.com", password: "123" });

            expect(jwt.sign).toHaveBeenCalledWith({ id: 1, email: "test@test.com" }, "test_secret", { expiresIn: "1d" });
            expect(result).toHaveProperty("token", "fake_token");
        });
    });
});
