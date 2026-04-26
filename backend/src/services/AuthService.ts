import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";

export class AuthService {
    static async register(data: any) {
        const { username, email, password } = data;

        // Validação de formato de username
        const usernameRegex = /^[a-zA-Z0-9._]+$/;
        if (!usernameRegex.test(username)) {
            throw new Error("Username inválido. Use apenas letras, números, ponto ou underline sem espaços.");
        }

        // Verificação de duplicidade de Username
        const existingUsername = await UserRepository.findByUsername(username);
        if (existingUsername) {
            throw new Error("Este username já está em uso.");
        }

        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Este email já está em uso.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = UserRepository.create({
            username,
            email,
            password: hashedPassword
        });

        await UserRepository.save(newUser);

        return { message: "User registered successfully", id: newUser.id };
    }

    static async login(data: any) {
        const { email, password } = data;

        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" } // Token expires in 1 day
        );

        return {
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };
    }
}
