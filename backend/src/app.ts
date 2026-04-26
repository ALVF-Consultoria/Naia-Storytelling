import express from "express";
import cors from "cors";
import path from "path";
import storyRoutes from "./routes/story.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Main API Routes
app.use("/api/auth", authRoutes);
app.use("/api", storyRoutes);

// --- FRONTEND SERVING (STATIC FILES) ---
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Handle React Routing (SPA Fallback)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

export default app;
