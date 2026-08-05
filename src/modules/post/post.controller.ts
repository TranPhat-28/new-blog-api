import {
    Body,
    Controller,
    Delete,
    Get,
    Post as HttpPost,
    Param,
    Patch,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/requests/create-post.dto';
import { PatchPostDto } from './dtos/requests/patch-post.dto';
import { UpdatePostDto } from './dtos/requests/update-post.dto';
import { PostDetailsDto } from './dtos/responses/post-details.dto';
import { PostSummaryDto } from './dtos/responses/post-summary.dto';
import { PostService } from './post.service';
import { PostQueryDto } from './dtos/requests/post-query.dto';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from '../auth/types/jwt-payload.type';

@ApiTags('Post')
@Controller('api/v1/posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
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
    @ApiQuery({
        name: 'sortBy',
        required: false,
        enum: ['createdAt', 'title'],
    })
    @ApiQuery({
        name: 'search',
        required: false,
        type: String,
    })
    @ApiQuery({
        name: 'tagId',
        required: false,
        type: String,
    })
    async findAll(
        @Query() query: PostQueryDto,
    ): Promise<PaginatedResponseDto<PostSummaryDto>> {
        const posts = await this.postService.findAll(query);
        return posts;
    }

    /* Find post by ID and include comments */
    @Get(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async findById(@Param('id') id: string): Promise<PostDetailsDto> {
        return await this.postService.findById(id);
    }

    @HttpPost()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() dto: CreatePostDto,
        @CurrentUser() user: JwtPayload,
    ): Promise<PostSummaryDto> {
        return await this.postService.create(dto, user.sub);
    }

    @Put(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id') id: string,
        @Body() dto: UpdatePostDto,
        @CurrentUser() user: JwtPayload,
    ): Promise<PostSummaryDto> {
        return await this.postService.update(id, dto, user.sub);
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async delete(
        @Param('id') id: string,
        @CurrentUser() user: JwtPayload,
    ): Promise<void> {
        return this.postService.delete(id, user.sub);
    }

    @Patch(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async patch(
        @Param('id') id: string,
        @Body() dto: PatchPostDto,
        @CurrentUser() user: JwtPayload,
    ): Promise<PostSummaryDto> {
        return await this.postService.patch(id, dto, user.sub);
    }

    // Attach a tag to a post
    @HttpPost(':postId/tags/:tagId')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async attachTag(
        @Param('postId') postId: string,
        @Param('tagId') tagId: string,
        @CurrentUser() user: JwtPayload,
    ): Promise<PostDetailsDto> {
        return await this.postService.attachTag(postId, tagId, user.sub);
    }

    // Remove a tag from a post
    @Delete(':postId/tags/:tagId')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async detachTag(
        @Param('postId') postId: string,
        @Param('tagId') tagId: string,
        @CurrentUser() user: JwtPayload,
    ): Promise<PostDetailsDto> {
        return await this.postService.detachTag(postId, tagId, user.sub);
    }
}
