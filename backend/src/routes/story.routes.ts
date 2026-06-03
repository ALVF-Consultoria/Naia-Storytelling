import { Router } from "express";
import { StoryController } from "../controllers/StoryController.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/generate", authMiddleware, StoryController.generate);
router.post("/save", authMiddleware, StoryController.save);
router.get("/stories", authMiddleware, StoryController.list);
router.post("/stories/:id/translate", authMiddleware, StoryController.translate);
router.delete("/stories/:id", authMiddleware, StoryController.delete);

export default router;
