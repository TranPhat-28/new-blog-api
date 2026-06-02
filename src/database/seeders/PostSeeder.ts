import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';

import { PostFactory } from '../factories/PostFactory';
import { CommentFactory } from '../factories/CommentFactory';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const posts = new PostFactory(em).make(50);

        for (const post of posts) {
            const commentCount = faker.number.int({
                min: 0,
                max: 20,
            });

            const comments = new CommentFactory(em).make(commentCount);

            comments.forEach((comment) => {
                comment.post = post;
            });
        }

        await em.flush();
    }
}
