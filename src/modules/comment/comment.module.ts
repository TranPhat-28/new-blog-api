import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentProfile } from './comment.profile';

@Module({
    controllers: [CommentController],
    providers: [CommentService, CommentProfile],
})
export class CommentModule {}
