import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";

export const UserRepository = AppDataSource.getRepository(User).extend({
    async findByEmail(email: string) {
        return this.findOne({ where: { email } });
    },
    async findByUsername(username: string) {
        return this.findOne({ where: { username } });
    },
    async findById(id: number) {
        return this.findOne({ where: { id } });
    }
});
