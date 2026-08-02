import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { OtpModule } from '../otp/otp.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

@Module({
    imports: [
        UserModule,
        OtpModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService): JwtModuleOptions => ({
                secret: config.getOrThrow<string>('jwt.secret'),
                signOptions: {
                    expiresIn: config.getOrThrow<StringValue>('jwt.expiresIn'),
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
