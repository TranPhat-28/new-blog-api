import { fakerEN as faker } from '@faker-js/faker';
import { Factory } from '@mikro-orm/seeder';
import { Comment } from '../../modules/comment/comment.entity';

export class CommentFactory extends Factory<Comment> {
    model = Comment;

    definition(): Partial<Comment> {
        return {
            content: faker.lorem.sentence(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
