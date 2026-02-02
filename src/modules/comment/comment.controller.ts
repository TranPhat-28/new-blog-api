import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentDetailsDto } from './dtos/responses/comment-details.dto';
import { CreateCommentDto } from './dtos/requests/create-comment.dto';
import { UpdateCommentDto } from './dtos/requests/update-comment.dto';

@ApiTags('Comment')
@Controller('api/v1')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('posts/:postId/comments')
    async findByPostId(
        @Param('postId') postId: string,
    ): Promise<CommentDetailsDto[]> {
        return this.commentService.findByPostId(postId);
    }

    @Get('comments/:id')
    async findById(@Param('id') id: string): Promise<CommentDetailsDto> {
        return await this.commentService.findById(id);
    }

    @Post('posts/:postId/comments')
    async create(
        @Param('postId') postId: string,
        @Body() dto: CreateCommentDto,
    ): Promise<CommentDetailsDto> {
        return await this.commentService.create(postId, dto);
    }

    @Put('comments/:id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateCommentDto,
    ): Promise<CommentDetailsDto> {
        return await this.commentService.update(id, dto);
    }
}
