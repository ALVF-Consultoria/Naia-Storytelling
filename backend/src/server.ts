import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;

// Database Connection and Server Start
AppDataSource.initialize()
    .then(() => {
        console.log("🗄️  Data Source has been initialized!");
        
        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ Error during Data Source initialization", err);
    });
