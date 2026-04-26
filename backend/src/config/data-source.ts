import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER || "user_naia",
    password: process.env.DB_PASSWORD || "password_naia",
    database: process.env.DB_NAME || "naia_storytelling",
    timezone: "Z", // Fixes 3-hour timezone offset by forcing UTC
    synchronize: true, // Automatically creates tables. Set to false in production.
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
});
