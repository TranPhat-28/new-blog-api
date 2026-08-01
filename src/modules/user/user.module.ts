import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProfile } from './user.profile';

@Module({
    controllers: [UserController],
    providers: [UserService, UserProfile],
    exports: [UserService],
})
export class UserModule {}
