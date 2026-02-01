import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Post } from './post.entity';
import { CreatePostDto } from './dtos/requests/create-post.dto';
import { UpdatePostDto } from './dtos/requests/update-post.dto';
import { PatchPostDto } from './dtos/requests/patch-post.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PostSummaryDto } from './dtos/responses/post-summary.dto';

@Injectable()
export class PostService {
    constructor(
        private readonly em: EntityManager,
        @InjectMapper() private readonly mapper: Mapper,
    ) {}

    async findAll(): Promise<PostSummaryDto[]> {
        const posts = await this.em.find(Post, {});
        return this.mapper.mapArray(posts, Post, PostSummaryDto);
    }

    async findById(id: string): Promise<Post> {
        return await this.em.findOneOrFail(
            Post,
            { id },
            { populate: ['comments'] },
        );
    }

    async create(dto: CreatePostDto): Promise<Post> {
        const post = new Post();
        post.title = dto.title;
        post.content = dto.content;
        await this.em.persist(post).flush();
        return post;
    }

    async update(id: string, dto: UpdatePostDto): Promise<Post> {
        const post = await this.em.findOneOrFail(Post, { id });
        post.title = dto.title;
        post.content = dto.content;
        await this.em.flush();
        return post;
    }

    async delete(id: string): Promise<void> {
        const post = await this.em.findOneOrFail(Post, { id });
        await this.em.remove(post).flush();
    }

    async patch(id: string, dto: PatchPostDto): Promise<Post> {
        const post = await this.em.findOneOrFail(Post, { id });
        if (dto.title !== undefined) {
            post.title = dto.title;
        }
        if (dto.content !== undefined) {
            post.content = dto.content;
        }
        await this.em.flush();
        return post;
    }
}
