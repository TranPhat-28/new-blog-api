import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '../mikro-orm.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
    imports: [
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
        MikroOrmModule.forRoot(mikroOrmConfig),
        ConfigModule.forRoot({ isGlobal: true }),
        PostModule,
        CommentModule,
        TagModule,
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}
