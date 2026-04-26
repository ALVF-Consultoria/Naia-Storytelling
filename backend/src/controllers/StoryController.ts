import { Request, Response } from "express";
import { StoryService } from "../services/StoryService";

export class StoryController {
    static async generate(req: Request, res: Response) {
        try {
            const { prompt, visualStyle } = req.body;
            
            if (!prompt) {
                return res.status(400).json({ error: 'Prompt is required' });
            }

            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized to create stories' });
            }

            const data = await StoryService.generateStory(prompt, userId, visualStyle);
            
            res.json(data);
        } catch (error: any) {
            console.error("❌ Controller Error:", error);
            res.status(500).json({ error: error.message || 'Error processing request' });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const stories = await StoryService.getUserStories(userId);
            res.json(stories);
        } catch (error: any) {
            console.error("❌ Controller List Error:", error);
            res.status(500).json({ error: error.message || 'Error listing stories' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            await StoryService.deleteStory(Number(id), userId);
            res.json({ message: "Story deleted successfully" });
        } catch (error: any) {
            console.error("❌ Controller Delete Error:", error);
            res.status(500).json({ error: error.message || 'Error deleting story' });
        }
    }

    static async translate(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { language } = req.body;
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            if (!language) {
                return res.status(400).json({ error: 'Language is required' });
            }

            const newStory = await StoryService.translateStory(Number(id), language, userId);
            res.json(newStory);
        } catch (error: any) {
            console.error("❌ Controller Translate Error:", error);
            res.status(500).json({ error: error.message || 'Error translating story' });
        }
    }
}
