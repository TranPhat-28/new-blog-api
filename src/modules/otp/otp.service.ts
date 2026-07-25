import { EntityManager } from '@mikro-orm/core';
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { createHash, randomInt } from 'crypto';
import { Otp } from './otp.entity';
import { OtpPurpose } from './enums/otp-purpose.enum';

@Injectable()
export class OtpService {
    constructor(private readonly em: EntityManager) {}

    private generateOtp(length: number = 6): string {
        const min = 10 ** (length - 1);
        const max = 10 ** length - 1;

        return randomInt(min, max + 1).toString();
    }

    private hashOtp(code: string): string {
        return createHash('sha256').update(code).digest('hex');
    }

    async requestOtp(
        email: string,
        purpose: OtpPurpose,
    ): Promise<{ code: string; expiresAt: Date }> {
        // Transaction to ensure only one active OTP per email
        return this.em.transactional(async (em) => {
            await em.nativeDelete(Otp, { email });

            const code = this.generateOtp();
            const codeHash = this.hashOtp(code);

            const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
            const now = Date.now();
            const createdAt = new Date(now);
            const expiresAt = new Date(now + OTP_TTL_MS);

            const otp = em.create(Otp, {
                email,
                codeHash,
                purpose,
                createdAt,
                expiresAt,
            });

            await em.persist(otp).flush();

            return {
                code,
                expiresAt,
            };
        });
    }

    async verifyOtp(
        email: string,
        code: string,
        purpose: OtpPurpose,
    ): Promise<void> {
        await this.em.transactional(async (em) => {
            const otp = await em.findOne(Otp, {
                email,
                purpose,
            });

            if (!otp) {
                throw new NotFoundException('OTP not found.');
            }

            if (otp.expiresAt < new Date()) {
                await em.remove(otp).flush();

                throw new BadRequestException('OTP has expired.');
            }

            const codeHash = this.hashOtp(code);

            if (otp.codeHash !== codeHash) {
                throw new BadRequestException('Invalid OTP.');
            }

            await em.remove(otp).flush();
        });
    }
}
