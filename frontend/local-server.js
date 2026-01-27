
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: '.env.local' });

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY missing in .env.local");
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || 'Error generating content' });
  }
});

app.listen(port, () => {
  console.log(`🔌 Backend local rodando em http://localhost:${port}`);
});
