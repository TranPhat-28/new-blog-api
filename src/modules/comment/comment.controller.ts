import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { CommentService } from './comment.service';
import { CommentDetailsDto } from './dtos/responses/comment-details.dto';
import { CreateCommentDto } from './dtos/requests/create-comment.dto';
import { UpdateCommentDto } from './dtos/requests/update-comment.dto';
import { CommentQueryDto } from './dtos/requests/comment-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from '../auth/types/jwt-payload.type';

@ApiTags('Comment')
@Controller('api/v1')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('posts/:postId/comments')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
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
    @ApiQuery({
        name: 'order',
        required: false,
        type: String,
    })
    async findByPostId(
        @Param('postId') postId: string,
        @Query() query: CommentQueryDto,
    ): Promise<PaginatedResponseDto<CommentDetailsDto>> {
        return this.commentService.findByPostId(postId, query);
    }

    @Get('comments/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async findById(@Param('id') id: string): Promise<CommentDetailsDto> {
        return await this.commentService.findById(id);
    }

    @Post('posts/:postId/comments')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async create(
        @Param('postId') postId: string,
        @Body() dto: CreateCommentDto,
        @CurrentUser() user: JwtPayload,
    ): Promise<CommentDetailsDto> {
        return await this.commentService.create(postId, dto, user.sub);
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
