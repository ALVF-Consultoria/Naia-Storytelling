import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Rotas
import storyRoutes from "./routes/story.routes.js";
import authRoutes from "./routes/auth.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- 1. CONFIGURAÇÕES DE AMBIENTE ---
const frontendUrl = (process.env.FRONTEND_URL || "").trim().replace(/\/$/, "");
const isDevelopment = process.env.NODE_ENV === "development";

// --- 2. MIDDLEWARES DE SEGURANÇA E GLOBAL ---

// Whitelist de origens para o CORS
const allowedOrigins = [
    frontendUrl,
    "http://localhost:5173",
    "https://storytellingnaia.alvf.net.br" // URL fixa como garantia extra
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // No Node, 'origin' é undefined para requisições do mesmo servidor ou ferramentas como Postman
        if (!origin || allowedOrigins.includes(origin) || isDevelopment) {
            callback(null, true);
        } else {
            console.warn(`🚫 CORS: Origem não permitida: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"]
}));

// Log de requisições simplificado (MOVIDO PARA O TOPO)
app.use((req, res, next) => {
    console.log(`📡 [${req.method}] ${req.originalUrl}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- 3. ROTAS DA API ---
app.use("/api/auth", authRoutes);
app.use("/api", storyRoutes);

// --- 4. SERVINDO O FRONTEND (STATIC FILES) ---
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Fallback para React (SPA) - deve ser a última rota
app.get("*", (req: Request, res: Response) => {
    // Se a requisição começa com /api e chegou aqui, é um 404 de API
    if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "Endpoint não encontrado" });
    }
    res.sendFile(path.join(publicPath, "index.html"));
});

// --- 5. MIDDLEWARE DE ERRO GLOBAL ---
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("❌ Erro não tratado:", err.stack);
    res.status(500).json({ 
        error: "Erro interno no servidor",
        message: isDevelopment ? err.message : undefined
    });
});

export default app;
