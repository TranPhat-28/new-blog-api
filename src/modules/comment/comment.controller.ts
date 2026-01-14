import { Controller, Post, Param, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('api/v1')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('posts/:postId/comments')
    async create(
        @Param('postId') postId: string,
        @Body() dto: CreateCommentDto,
    ): Promise<Comment> {
        return this.commentService.create(postId, dto);
    }
}
