import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Comment } from '../comment/comment.entity';
import { CommentDetailsDto } from '../comment/dtos/responses/comment-details.dto';
import { TagSummaryDto } from '../tag/dtos/responses/tag-summary.dto';
import { Tag } from '../tag/tag.entity';
import { CreatePostDto } from './dtos/requests/create-post.dto';
import { PatchPostDto } from './dtos/requests/patch-post.dto';
import { UpdatePostDto } from './dtos/requests/update-post.dto';
import { PostDetailsDto } from './dtos/responses/post-details.dto';
import { PostSummaryDto } from './dtos/responses/post-summary.dto';
import { Post } from './post.entity';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@Injectable()
export class PostService {
    constructor(
        private readonly em: EntityManager,
        @InjectMapper() private readonly mapper: Mapper,
    ) {}

    async findAll(query: PaginationQueryDto): Promise<PostSummaryDto[]> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;

        const posts = await this.em.find(Post, {}, { limit, offset });

        return this.mapper.mapArray(posts, Post, PostSummaryDto);
    }

    /* Find post by ID and include comments and tags */
    async findById(id: string): Promise<PostDetailsDto> {
        const post = await this.em.findOneOrFail(
            Post,
            { id },
            { populate: ['comments', 'tags'] },
        );

        const result = this.mapper.map(post, Post, PostDetailsDto);

        // Map Comments
        result.comments = this.mapper.mapArray(
            post.comments.getItems(),
            Comment,
            CommentDetailsDto,
        );

        // Map Tags
        result.tags = this.mapper.mapArray(
            post.tags.getItems(),
            Tag,
            TagSummaryDto,
        );

        return result;
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

    async attachTag(postId: string, tagId: string): Promise<PostDetailsDto> {
        const post = await this.em.findOneOrFail(
            Post,
            { id: postId },
            { populate: ['tags'] },
        );

        const tag = await this.em.findOneOrFail(Tag, { id: tagId });

        // avoid duplicate relation
        if (!post.tags.contains(tag)) {
            post.tags.add(tag);
            await this.em.flush();
        }

        // load latest changes for response
        return await this.findById(postId);
    }

    async detachTag(postId: string, tagId: string): Promise<PostDetailsDto> {
        const post = await this.em.findOneOrFail(
            Post,
            { id: postId },
            { populate: ['tags'] },
        );

        const tag = await this.em.findOneOrFail(Tag, { id: tagId });

        if (post.tags.contains(tag)) {
            post.tags.remove(tag);
            await this.em.flush();
        }

        // load latest changes for response
        return await this.findById(postId);
    }
}
