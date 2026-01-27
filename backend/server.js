const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
// Hostinger uses process.env.PORT
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- API ROUTES ---
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing in environment variables!");
    return res.status(500).json({ error: 'Server configuration error: API Key missing' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Using gemini-2.5-flash-lite as requested by user
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
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Handle React Routing (SPA Fallback)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// --- START SERVER ---
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
