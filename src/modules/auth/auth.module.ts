import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from '../otp/otp.service';
import { UserService } from '../user/user.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService, UserService, OtpService],
})
export class AuthModule {}
