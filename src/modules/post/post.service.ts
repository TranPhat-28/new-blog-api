import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Post } from '../../entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Post[]> {
    return this.em.find(Post, {});
  }
}
