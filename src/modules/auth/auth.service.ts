import { Injectable } from '@nestjs/common';
import { OtpPurpose } from '../otp/enums/otp-purpose.enum';
import { OtpService } from '../otp/otp.service';
import { UserService } from '../user/user.service';
import { RequestCodeDto } from './dtos/requests/request-code.dto';
// import { VerifyCodeDto } from './dtos/requests/verify-code.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly otpService: OtpService,
    ) {}

    async requestCode(dto: RequestCodeDto) {
        const user = await this.userService.findByEmail(dto.email);

        const purpose = user ? OtpPurpose.LOGIN : OtpPurpose.REGISTER;

        const otp = await this.otpService.requestOtp(dto.email, purpose);

        return otp;
    }

    // async verifyCode(dto: VerifyCodeDto) {
    //     let user = await this.userService.findByEmail(dto.email);

    //     const purpose = user ? OtpPurpose.LOGIN : OtpPurpose.REGISTER;

    //     await this.otpService.verifyOtp(dto.email, dto.code, purpose);

    //     if (!user) {
    //         user = await this.userService.create({
    //             email: dto.email,
    //         });
    //     }

    //     // TODO: Issue JWT
    //     return user;
    // }
}
