import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Post } from './post.entity';
import { CreatePostDto } from './dtos/requests/create-post.dto';
import { UpdatePostDto } from './dtos/requests/update-post.dto';
import { PatchPostDto } from './dtos/requests/patch-post.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PostSummaryDto } from './dtos/responses/post-summary.dto';
import { PostDetailsDto } from './dtos/responses/post-details.dto';

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

    /* Find post by ID and include comments */
    async findById(id: string): Promise<PostDetailsDto> {
        const post = await this.em.findOneOrFail(
            Post,
            { id },
            { populate: ['comments'] },
        );

        return this.mapper.map(post, Post, PostDetailsDto);
    }

    async create(dto: CreatePostDto): Promise<PostSummaryDto> {
        const post = this.mapper.map(dto, CreatePostDto, Post);

        await this.em.persist(post).flush();

        return this.mapper.map(post, Post, PostSummaryDto);
    }

    async update(id: string, dto: UpdatePostDto): Promise<PostSummaryDto> {
        const post = await this.em.findOneOrFail(Post, { id });

        post.title = dto.title;
        post.content = dto.content;

        await this.em.flush();

        return this.mapper.map(post, Post, PostSummaryDto);
    }

    async delete(id: string): Promise<void> {
        const post = await this.em.findOneOrFail(Post, { id });

        await this.em.remove(post).flush();
    }

    async patch(id: string, dto: PatchPostDto): Promise<PostSummaryDto> {
        const post = await this.em.findOneOrFail(Post, { id });

        if (dto.title !== undefined) {
            post.title = dto.title;
        }
        if (dto.content !== undefined) {
            post.content = dto.content;
        }

        await this.em.flush();

        return this.mapper.map(post, Post, PostSummaryDto);
    }
}
