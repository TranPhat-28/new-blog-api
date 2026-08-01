import { Injectable } from '@nestjs/common';
import { OtpPurpose } from '../otp/enums/otp-purpose.enum';
import { OtpService } from '../otp/otp.service';
import { UserService } from '../user/user.service';
import { RequestCodeDto } from './dtos/requests/request-code.dto';
import { VerifyCodeDto } from './dtos/requests/verify-code.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';
import { AuthResponseDto } from './dtos/responses/auth-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly otpService: OtpService,
        private readonly jwtService: JwtService,
    ) {}

    async requestCode(dto: RequestCodeDto) {
        const user = await this.userService.findByEmail(dto.email);

        const purpose = user ? OtpPurpose.LOGIN : OtpPurpose.REGISTER;

        const otp = await this.otpService.requestOtp(dto.email, purpose);

        return otp;
    }

    async verifyCode(dto: VerifyCodeDto) {
        let user = await this.userService.findByEmail(dto.email);

        const purpose = user ? OtpPurpose.LOGIN : OtpPurpose.REGISTER;

        await this.otpService.verifyOtp(dto.email, dto.code, purpose);

        if (!user) {
            const createUserDto = {
                email: dto.email,
                displayName: dto.email.split('@')[0],
            };

            user = await this.userService.create(createUserDto);
        }

        const token = await this.generateJwt(user.email, user.id);

        const result: AuthResponseDto = {
            email: user.email,
            accessToken: token,
        };

        return result;
    }

    async generateJwt(email: string, id: string): Promise<string> {
        const payload: JwtPayload = {
            sub: id,
            email: email,
        };

        return await this.jwtService.signAsync(payload);
    }
}
