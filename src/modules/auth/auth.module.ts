import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { OtpModule } from '../otp/otp.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UserModule,
        OtpModule,
        JwtModule.register({
            secret: process.env.APP_JWT_SECRET || 'default-secret',
            signOptions: {
                expiresIn: '15m',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
