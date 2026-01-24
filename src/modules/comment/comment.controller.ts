import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';

@Controller('api/v1')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('posts/:postId/comments')
    async findByPostId(@Param('postId') postId: string): Promise<CommentDto[]> {
        return this.commentService.findByPostId(postId);
    }

    @Post('posts/:postId/comments')
    async create(
        @Param('postId') postId: string,
        @Body() dto: CreateCommentDto,
    ): Promise<Comment> {
        return this.commentService.create(postId, dto);
    }
}
