import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { ForbiddenException, Injectable } from '@nestjs/common';
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
import { PostQueryDto } from './dtos/requests/post-query.dto';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
    constructor(
        private readonly em: EntityManager,
        @InjectMapper() private readonly mapper: Mapper,
    ) {}

    async findAll(
        query: PostQueryDto,
    ): Promise<PaginatedResponseDto<PostSummaryDto>> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;

        /** If there is a search query, filter posts by title or content. */
        /** If there is a tagId query, filter posts by tagId. */
        const where: FilterQuery<Post> = {};

        if (query.search) {
            where.$or = [
                {
                    title: {
                        $ilike: `%${query.search}%`,
                    },
                },
                {
                    content: {
                        $ilike: `%${query.search}%`,
                    },
                },
            ];
        }

        if (query.tagId) {
            where.tags = {
                id: query.tagId,
            };
        }

        const posts = await this.em.find(Post, where, {
            populate: ['author'],
            limit,
            offset,
            orderBy: {
                [query.sortBy]: query.order,
            },
        });

        const total = await this.em.count(Post, where);
        const totalPages = Math.ceil(total / limit);

        return {
            data: this.mapper.mapArray(posts, Post, PostSummaryDto),
            meta: {
                page,
                limit,
                total,
                totalPages,
            },
        };
    }

    /* Find post by ID and include comments and tags */
    async findById(id: string): Promise<PostDetailsDto> {
        const post = await this.em.findOneOrFail(
            Post,
            { id },
            { populate: ['comments', 'tags', 'author'] },
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

    async create(
        dto: CreatePostDto,
        authorId: string,
    ): Promise<PostSummaryDto> {
        const post = this.mapper.map(dto, CreatePostDto, Post);

        const author = await this.em.findOneOrFail(User, {
            id: authorId,
        });

        post.author = author;

        await this.em.persist(post).flush();

        return this.mapper.map(post, Post, PostSummaryDto);
    }

    async update(
        id: string,
        dto: UpdatePostDto,
        currentUserId?: string,
    ): Promise<PostSummaryDto> {
        const post = await this.em.findOneOrFail(
            Post,
            { id },
            { populate: ['author'] },
        );

        this.ensureAuthor(post, currentUserId);

        post.title = dto.title;
        post.content = dto.content;

        await this.em.flush();

        return this.mapper.map(post, Post, PostSummaryDto);
    }

    async delete(id: string, currentUserId?: string): Promise<void> {
        const post = await this.em.findOneOrFail(
            Post,
            { id },
            { populate: ['author'] },
        );

        this.ensureAuthor(post, currentUserId);

        await this.em.remove(post).flush();
    }

    async patch(
        id: string,
        dto: PatchPostDto,
        currentUserId?: string,
    ): Promise<PostSummaryDto> {
        const post = await this.em.findOneOrFail(
            Post,
            { id },
            { populate: ['author'] },
        );

        this.ensureAuthor(post, currentUserId);

        if (dto.title !== undefined) {
            post.title = dto.title;
        }
        if (dto.content !== undefined) {
            post.content = dto.content;
        }

        await this.em.flush();

        return this.mapper.map(post, Post, PostSummaryDto);
    }

    private ensureAuthor(post: Post, currentUserId?: string): void {
        if (!currentUserId || post.author?.id !== currentUserId) {
            throw new ForbiddenException(
                'Only the author can perform this action.',
            );
        }
    }

    async attachTag(
        postId: string,
        tagId: string,
        currentUserId?: string,
    ): Promise<PostDetailsDto> {
        const post = await this.em.findOneOrFail(
            Post,
            { id: postId },
            { populate: ['tags', 'author'] },
        );

        this.ensureAuthor(post, currentUserId);

        const tag = await this.em.findOneOrFail(Tag, { id: tagId });

        // avoid duplicate relation
        if (!post.tags.contains(tag)) {
            post.tags.add(tag);
            await this.em.flush();
        }

        // load latest changes for response
        return await this.findById(postId);
    }

    async detachTag(
        postId: string,
        tagId: string,
        currentUserId?: string,
    ): Promise<PostDetailsDto> {
        const post = await this.em.findOneOrFail(
            Post,
            { id: postId },
            { populate: ['tags', 'author'] },
        );

        this.ensureAuthor(post, currentUserId);

        const tag = await this.em.findOneOrFail(Tag, { id: tagId });

        if (post.tags.contains(tag)) {
            post.tags.remove(tag);
            await this.em.flush();
        }

        // load latest changes for response
        return await this.findById(postId);
    }
}
