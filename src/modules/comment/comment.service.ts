import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Comment } from './comment.entity';
import { Post } from '../post/post.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(private readonly em: EntityManager) {}

    async create(postId: string, dto: CreateCommentDto): Promise<Comment> {
        const comment = new Comment();
        comment.content = dto.content;

        const post = await this.em.findOneOrFail(Post, { id: postId });
        comment.post = post;
        await this.em.persist(comment).flush();
        return comment;
    }
}
