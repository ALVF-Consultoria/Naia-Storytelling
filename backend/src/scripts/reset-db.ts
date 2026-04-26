import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function reset() {
    console.log("🛠️  Iniciando reset do banco de dados...");
    
    // Conecta sem especificar o banco para poder deletá-lo
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        user: process.env.DB_USER || "user_naia",
        password: process.env.DB_PASSWORD || "password_naia",
    });

    const dbName = process.env.DB_NAME || "naia_storytelling";

    try {
        console.log(`🗑️  Removendo banco de dados [${dbName}]...`);
        await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
        
        console.log(`✨ Recriando banco de dados [${dbName}]...`);
        await connection.query(`CREATE DATABASE \`${dbName}\``);

        console.log("✅ Banco de dados resetado com sucesso!");
    } catch (error) {
        console.error("❌ Falha ao resetar o banco:", error);
    } finally {
        await connection.end();
    }
}

reset().catch(err => {
    console.error("❌ Erro fatal:", err);
    process.exit(1);
});
