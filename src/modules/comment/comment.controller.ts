import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentDetailsDto } from './dtos/responses/comment-details.dto';
import { CreateCommentDto } from './dtos/requests/create-comment.dto';
import { UpdateCommentDto } from './dtos/requests/update-comment.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@ApiTags('Comment')
@Controller('api/v1')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('posts/:postId/comments')
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
    })
    async findByPostId(
        @Param('postId') postId: string,
        @Query() query: PaginationQueryDto,
    ): Promise<CommentDetailsDto[]> {
        return this.commentService.findByPostId(postId, query);
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

    @Delete('comments/:id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.commentService.delete(id);
    }
}
