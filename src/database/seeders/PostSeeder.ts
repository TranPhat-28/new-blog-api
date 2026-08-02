import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';

import { PostFactory } from '../factories/PostFactory';
import { CommentFactory } from '../factories/CommentFactory';
import { UserFactory } from '../factories/UserFactory';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        /** Seed Posts and Comments */
        const posts = new PostFactory(em).make(100);

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

        /** Seed Users */
        const userFactory = new UserFactory(em);

        em.persist([
            userFactory.createUser('admin@example.com', 'Admin'),
            userFactory.createUser('alice@example.com', 'Alice'),
            userFactory.createUser('bob@example.com', 'Bob'),
            userFactory.createUser('charlie@example.com', 'Charlie'),
        ]);

        await em.flush();
    }
}
