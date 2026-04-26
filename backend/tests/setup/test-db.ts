import { DataSource } from "typeorm";
import { User } from "../../src/entities/User";
import { Story } from "../../src/entities/Story";

export const TestDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Story],
});

export const setupTestDB = async () => {
    if (!TestDataSource.isInitialized) {
        await TestDataSource.initialize();
    }
};

export const teardownTestDB = async () => {
    if (TestDataSource.isInitialized) {
        await TestDataSource.destroy();
    }
};
