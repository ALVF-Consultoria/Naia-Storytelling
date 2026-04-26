import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

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
