import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtPayload } from '../auth/types/jwt-payload.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('User')
@Controller('api/v1')
export class UserController {
    @Get('me')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    getMe(@CurrentUser() user: JwtPayload) {
        return user;
    }
}
