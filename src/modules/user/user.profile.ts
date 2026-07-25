import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/requests/create-user.dto';
import { UserDetailsDto } from './dtos/responses/user-details.dto';
import { User } from './user.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, User, UserDetailsDto);
            createMap(mapper, CreateUserDto, User);
        };
    }
}
