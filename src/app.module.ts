import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '../mikro-orm.config';

@Module({
    imports: [
        MikroOrmModule.forRoot(mikroOrmConfig),
        ConfigModule.forRoot({ isGlobal: true }),
        PostModule,
        CommentModule,
    ],
})
export class AppModule {}
