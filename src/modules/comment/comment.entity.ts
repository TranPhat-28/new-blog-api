import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Post } from '../post/post.entity';

import { AutoMap } from '@automapper/classes';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
    @AutoMap()
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    id!: string;

    @AutoMap()
    @Property({ type: 'text' })
    content!: string;

    @ManyToOne(() => Post, {
        deleteRule: 'cascade',
    })
    post!: Post;

    @AutoMap()
    @Property()
    createdAt: Date = new Date();

    @AutoMap()
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @ManyToOne(() => User)
    author!: User;
}
