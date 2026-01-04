import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/posts')
export class PostController {
  @Get()
  findAll(): string {
    return 'All posts';
  }
}
