import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestCodeDto } from './dtos/requests/request-code.dto';
import { VerifyCodeDto } from './dtos/requests/verify-code.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('request-code')
    async requestCode(
        @Body() dto: RequestCodeDto,
    ): Promise<{ code: string; expiresAt: Date }> {
        const otp = await this.authService.requestCode(dto);
        return otp;
    }

    @Post('verify-code')
    async verifyCode(
        @Body() dto: VerifyCodeDto,
    ): Promise<{ email: string; jwt: string }> {
        const jwt = await this.authService.verifyCode(dto);
        return jwt;
    }
}
