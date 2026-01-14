import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Post {
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    id!: string;

    @Property()
    title!: string;

    @Property({ type: 'text' })
    content!: string;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments = new Collection<Comment>(this);

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
