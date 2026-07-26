import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestCodeDto } from './dtos/requests/request-code.dto';
// import { VerifyCodeDto } from './dtos/requests/verify-code.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('request-code')
    async requestCode(@Body() dto: RequestCodeDto) {
        const otp = await this.authService.requestCode(dto);
        return otp;
    }

    // @Post('verify-code')
    // verifyCode(@Body() dto: VerifyCodeDto): string {
    //     return 'Verifying OTP code for email: ' + dto.email;
    // }
}
