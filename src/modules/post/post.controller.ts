import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/v1/posts')
export class PostController {
  @Get()
  findAll(): string {
    return 'All posts';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `Post ${id}`;
  }
}
