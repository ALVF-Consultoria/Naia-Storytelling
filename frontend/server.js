import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
// Hostinger provides port via process.env.PORT, default to 3000
const port = process.env.PORT || 3000;

// Replicate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// --- API ROUTES ---
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Debug: Log if key is missing (safe log)
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing in environment variables!");
    return res.status(500).json({ error: 'Server configuration error: API Key missing' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // 使用 gemini-2.5-flash-lite como solicitado
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: error.message || 'Error generating content' });
  }
});

// --- FRONTEND SERVING (STATIC FILES) ---
// Serve static files from the 'dist' directory (Vite build output)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Handle React Routing (SPA Fallback)
// Any request that doesn't match an API route or static file returns index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// --- START SERVER ---
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
