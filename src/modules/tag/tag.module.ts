import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagProfile } from './tag.profile';

@Module({
    controllers: [TagController],
    providers: [TagService, TagProfile],
})
export class TagModule {}
