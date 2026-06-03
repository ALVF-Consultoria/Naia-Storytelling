import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./config/data-source.js";
import app from "./app.js";


const port = process.env.PORT || 3000;

// Log para confirmar que o processo iniciou e se as envs carregaram
console.log(`🎬 Servidor Iniciado. FRONTEND_URL carregada: "${process.env.FRONTEND_URL || 'NÃO CARREGADA'}"`);

// Captura de erros fatais para o log

process.on('uncaughtException', (err) => {
    console.error('💥 FATAL ERROR (Uncaught Exception):', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 FATAL ERROR (Unhandled Rejection):', reason);
});

// Database Connection and Server Start
AppDataSource.initialize()
    .then(() => {
        console.log("🗄️  Data Source has been initialized!");
        
        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ CRITICAL: Error during Data Source initialization", err);
        // Não encerramos o processo aqui para que o Passenger veja que tentamos subir
    });

