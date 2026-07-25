import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDetailsDto } from './dtos/responses/user-details.dto';
import { CreateUserDto } from './dtos/requests/create-user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class UserService {
    constructor(
        private readonly em: EntityManager,
        @InjectMapper() private readonly mapper: Mapper,
    ) {}

    async findById(id: string): Promise<UserDetailsDto> {
        const user = await this.em.findOneOrFail(User, { id });

        return this.mapper.map(user, User, UserDetailsDto);
    }

    async findByEmail(email: string): Promise<UserDetailsDto | null> {
        const user = await this.em.findOne(User, { email });

        return user ? this.mapper.map(user, User, UserDetailsDto) : null;
    }

    async create(dto: CreateUserDto): Promise<UserDetailsDto> {
        const user = this.mapper.map(dto, CreateUserDto, User);

        await this.em.persist(user).flush();

        return this.mapper.map(user, User, UserDetailsDto);
    }
}
