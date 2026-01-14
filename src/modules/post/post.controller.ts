import {
    Controller,
    Get,
    Param,
    Post as HttpPost,
    Body,
    Put,
    Delete,
    Patch,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('api/v1/posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async findAll(): Promise<Post[]> {
        return this.postService.findAll();
    }

    /* Find post by ID and include comments */
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Post> {
        return this.postService.findById(id);
    }

    @HttpPost()
    async create(@Body() dto: CreatePostDto): Promise<Post> {
        return this.postService.create(dto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdatePostDto,
    ): Promise<Post> {
        return this.postService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.postService.delete(id);
    }

    @Patch(':id')
    async patch(
        @Param('id') id: string,
        @Body() dto: PatchPostDto,
    ): Promise<Post> {
        return this.postService.patch(id, dto);
    }
}
