import { AppDataSource } from "../config/data-source";
import { Story } from "../entities/Story";

export const StoryRepository = AppDataSource.getRepository(Story).extend({
    async findByUser(userId: number) {
        return this.find({
            where: { user: { id: userId } },
            order: { createdAt: "DESC" }
        });
    },

    async deleteByIdAndUser(storyId: number, userId: number) {
        const story = await this.findOne({
            where: { id: storyId, user: { id: userId } }
        });

        if (!story) {
            return null;
        }

        return this.remove(story);
    }
});
