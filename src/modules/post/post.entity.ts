import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
    ManyToMany,
} from '@mikro-orm/core';
import { Comment } from '../comment/comment.entity';

import { AutoMap } from '@automapper/classes';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Post {
    @AutoMap()
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    id!: string;

    @AutoMap()
    @Property()
    title!: string;

    @AutoMap()
    @Property({ type: 'text' })
    content!: string;

    @AutoMap(() => [Comment])
    @OneToMany(() => Comment, (comment) => comment.post)
    comments = new Collection<Comment>(this);

    @AutoMap()
    @Property()
    createdAt: Date = new Date();

    @AutoMap()
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @ManyToMany(() => Tag, (tag) => tag.posts, {
        owner: true,
    })
    tags = new Collection<Tag>(this);
}
