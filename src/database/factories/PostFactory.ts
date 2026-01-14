import { fakerEN as faker } from '@faker-js/faker';
import { Factory } from '@mikro-orm/seeder';
import { Post } from '../../modules/post/post.entity';

export class PostFactory extends Factory<Post> {
    model = Post;

    definition(): Partial<Post> {
        return {
            title: faker.book.title(),
            content: faker.commerce.productDescription(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
