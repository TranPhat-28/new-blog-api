import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Post[]> {
    return await this.em.find(Post, {});
  }

  async findById(id: string): Promise<Post> {
    return await this.em.findOneOrFail(Post, { id });
  }
}
