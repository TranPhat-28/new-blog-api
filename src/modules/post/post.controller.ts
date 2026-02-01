import {
    Body,
    Controller,
    Delete,
    Get,
    Post as HttpPost,
    Param,
    Patch,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/requests/create-post.dto';
import { PatchPostDto } from './dtos/requests/patch-post.dto';
import { UpdatePostDto } from './dtos/requests/update-post.dto';
import { PostSummaryDto } from './dtos/responses/post-summary.dto';
import { PostService } from './post.service';
import { PostDetailsDto } from './dtos/responses/post-details.dto';

@ApiTags('Post')
@Controller('api/v1/posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async findAll(): Promise<PostSummaryDto[]> {
        const posts = await this.postService.findAll();
        return posts;
    }

    /* Find post by ID and include comments */
    @Get(':id')
    async findById(@Param('id') id: string): Promise<PostDetailsDto> {
        return await this.postService.findById(id);
    }

    @HttpPost()
    async create(@Body() dto: CreatePostDto): Promise<PostSummaryDto> {
        return await this.postService.create(dto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdatePostDto,
    ): Promise<PostSummaryDto> {
        return await this.postService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.postService.delete(id);
    }

    @Patch(':id')
    async patch(
        @Param('id') id: string,
        @Body() dto: PatchPostDto,
    ): Promise<PostSummaryDto> {
        return await this.postService.patch(id, dto);
    }
}
