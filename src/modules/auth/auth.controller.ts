import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestCodeDto } from './dtos/requests/request-code.dto';
import { VerifyCodeDto } from './dtos/requests/verify-code.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    @Post('request-code')
    requestCode(@Body() dto: RequestCodeDto): string {
        return 'Request OTP code for email: ' + dto.email;
    }

    @Post('verify-code')
    verifyCode(@Body() dto: VerifyCodeDto): string {
        return 'Verifying OTP code for email: ' + dto.email;
    }
}
