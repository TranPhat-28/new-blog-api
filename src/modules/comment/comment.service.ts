import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Post } from '../post/post.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dtos/requests/create-comment.dto';
import { CommentDetailsDto } from './dtos/responses/comment-details.dto';
import { UpdateCommentDto } from './dtos/requests/update-comment.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@Injectable()
export class CommentService {
    constructor(
        private readonly em: EntityManager,
        @InjectMapper() private readonly mapper: Mapper,
    ) {}

    async create(
        postId: string,
        dto: CreateCommentDto,
    ): Promise<CommentDetailsDto> {
        const comment = this.mapper.map(dto, CreateCommentDto, Comment);

        const post = await this.em.findOneOrFail(Post, { id: postId });
        comment.post = post;

        await this.em.persist(comment).flush();

        return this.mapper.map(comment, Comment, CommentDetailsDto);
    }

    async findByPostId(
        postId: string,
        query: PaginationQueryDto,
    ): Promise<CommentDetailsDto[]> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;

        const comments = await this.em.find(
            Comment,
            { post: postId },
            { limit, offset },
        );

        return this.mapper.mapArray(comments, Comment, CommentDetailsDto);
    }

    async findById(id: string): Promise<CommentDetailsDto> {
        const comment = await this.em.findOneOrFail(Comment, { id });

        return this.mapper.map(comment, Comment, CommentDetailsDto);
    }

    async update(
        id: string,
        dto: UpdateCommentDto,
    ): Promise<CommentDetailsDto> {
        const comment = await this.em.findOneOrFail(Comment, { id });

        comment.content = dto.content;

        await this.em.flush();

        return this.mapper.map(comment, Comment, CommentDetailsDto);
    }

    async delete(id: string): Promise<void> {
        const comment = await this.em.findOneOrFail(Comment, { id });

        await this.em.remove(comment).flush();
    }
}
