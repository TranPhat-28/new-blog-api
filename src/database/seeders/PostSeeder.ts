import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';

import { PostFactory } from '../factories/PostFactory';
import { CommentFactory } from '../factories/CommentFactory';
import { UserFactory } from '../factories/UserFactory';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        /** Seed Users */
        const userFactory = new UserFactory(em);

        const admin = userFactory.createUser('admin@example.com', 'Admin');
        const alice = userFactory.createUser('alice@example.com', 'Alice');
        const bob = userFactory.createUser('bob@example.com', 'Bob');
        const charlie = userFactory.createUser(
            'charlie@example.com',
            'Charlie',
        );

        em.persist([admin, alice, bob, charlie]);

        /** Seed Posts and Comments */
        const posts = new PostFactory(em).make(100);

        const authors = [alice, bob, charlie];

        for (const post of posts) {
            post.author = faker.helpers.arrayElement(authors);

            const commentCount = faker.number.int({
                min: 0,
                max: 20,
            });

            const comments = new CommentFactory(em).make(commentCount);

            comments.forEach((comment) => {
                comment.author = faker.helpers.arrayElement(authors);
                comment.post = post;
            });
        }

        await em.flush();
    }
}
