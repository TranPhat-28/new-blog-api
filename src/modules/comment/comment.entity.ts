import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Post } from '../post/post.entity';

@Entity()
export class Comment {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ type: 'text' })
  content!: string;

  @ManyToOne(() => Post, {
    deleteRule: 'cascade',
  })
  post!: Post;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
