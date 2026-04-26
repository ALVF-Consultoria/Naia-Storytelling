import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { UserRepository } from "../repositories/UserRepository";

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            console.error("❌ Register Error:", error);
            res.status(400).json({ error: error.message || "Error registering user" });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json(result);
        } catch (error: any) {
            console.error("❌ Login Error:", error.message);
            res.status(401).json({ error: error.message || "Error logging in" });
        }
    }

    static async me(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.status(401).json({ error: "Unauthorized" });

            const user = await UserRepository.findById(userId);
            if (!user) return res.status(404).json({ error: "User not found" });

            res.json({ 
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error: any) {
            console.error("❌ Me Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async deleteAccount(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            await UserRepository.delete(userId);
            res.status(200).json({ message: "Account deleted successfully" });
        } catch (error: any) {
            console.error("❌ Delete Account Error:", error);
            res.status(500).json({ error: "Error deleting account" });
        }
    }
}
