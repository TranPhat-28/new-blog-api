import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProfile } from './user.profile';

@Module({
    providers: [UserService, UserProfile],
    exports: [UserService],
})
export class UserModule {}
