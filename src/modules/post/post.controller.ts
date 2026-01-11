import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from '../../entities/post.entity';

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

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `Post ${id}`;
  }
}
