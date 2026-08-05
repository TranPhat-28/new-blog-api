import { AutoMap } from '@automapper/classes';
import {
    Collection,
    Entity,
    OneToMany,
    PrimaryKey,
    Property,
    Unique,
} from '@mikro-orm/core';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class User {
    @AutoMap()
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    id!: string;

    @AutoMap()
    @Unique()
    @Property()
    email!: string;

    @AutoMap()
    @Property()
    displayName!: string;

    @AutoMap()
    @Property()
    createdAt: Date = new Date();

    @AutoMap()
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @OneToMany(() => Post, (post) => post.author)
    posts = new Collection<Post>(this);

    @OneToMany(() => Comment, (comment) => comment.author)
    comments = new Collection<Comment>(this);
}
