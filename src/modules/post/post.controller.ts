import { Controller, Get, Param, Post as HttpPost, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Post> {
    return this.postService.findById(id);
  }

  @HttpPost()
  async create(@Body() dto: CreatePostDto): Promise<Post> {
    return this.postService.create(dto);
  }
}
