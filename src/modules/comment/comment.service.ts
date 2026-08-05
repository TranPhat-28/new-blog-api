import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dtos/requests/create-comment.dto';
import { CommentDetailsDto } from './dtos/responses/comment-details.dto';
import { UpdateCommentDto } from './dtos/requests/update-comment.dto';
import { CommentQueryDto } from './dtos/requests/comment-query.dto';

@Injectable()
export class CommentService {
    constructor(
        private readonly em: EntityManager,
        @InjectMapper() private readonly mapper: Mapper,
    ) {}

    async create(
        postId: string,
        dto: CreateCommentDto,
        authorId?: string,
    ): Promise<CommentDetailsDto> {
        const comment = this.mapper.map(dto, CreateCommentDto, Comment);

        const post = await this.em.findOneOrFail(Post, { id: postId });
        const author = await this.em.findOneOrFail(User, { id: authorId });

        comment.post = post;
        comment.author = author;

        await this.em.persist(comment).flush();

        return this.mapper.map(comment, Comment, CommentDetailsDto);
    }

    async findByPostId(
        postId: string,
        query: CommentQueryDto,
    ): Promise<PaginatedResponseDto<CommentDetailsDto>> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;

        const comments = await this.em.find(
            Comment,
            { post: postId },
            {
                populate: ['author'],
                limit,
                offset,
                orderBy: {
                    createdAt: query.order,
                },
            },
        );

        const total = await this.em.count(Comment, { post: postId });
        const totalPages = Math.ceil(total / limit);

        return {
            data: this.mapper.mapArray(comments, Comment, CommentDetailsDto),
            meta: {
                page,
                limit,
                total,
                totalPages,
            },
        };
    }

    async findById(id: string): Promise<CommentDetailsDto> {
        const comment = await this.em.findOneOrFail(
            Comment,
            { id },
            { populate: ['author'] },
        );

        return this.mapper.map(comment, Comment, CommentDetailsDto);
    }

    async update(
        id: string,
        dto: UpdateCommentDto,
        currentUserId?: string,
    ): Promise<CommentDetailsDto> {
        const comment = await this.em.findOneOrFail(
            Comment,
            { id },
            { populate: ['author'] },
        );

        this.ensureAuthor(comment, currentUserId);

        comment.content = dto.content;

        await this.em.flush();

        return this.mapper.map(comment, Comment, CommentDetailsDto);
    }

    async delete(id: string, currentUserId?: string): Promise<void> {
        const comment = await this.em.findOneOrFail(
            Comment,
            { id },
            { populate: ['author'] },
        );

        this.ensureAuthor(comment, currentUserId);

        await this.em.remove(comment).flush();
    }

    private ensureAuthor(comment: Comment, currentUserId?: string): void {
        if (!currentUserId || comment.author?.id !== currentUserId) {
            throw new ForbiddenException(
                'Only the author can perform this action.',
            );
        }
    }
}
