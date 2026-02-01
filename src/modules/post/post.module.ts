import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostProfile } from './post.profile';

@Module({
    controllers: [PostController],
    providers: [PostService, PostProfile],
})
export class PostModule {}
