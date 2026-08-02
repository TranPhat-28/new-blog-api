import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
    ExtractJwt,
    Strategy,
    type StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const options: StrategyOptionsWithoutRequest = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('jwt.secret'),
        };

        super(options);
    }

    validate(payload: JwtPayload): JwtPayload {
        return payload;
    }
}
