import { AutoMap } from '@automapper/classes';

export class UserDetailsDto {
    @AutoMap()
    id!: string;

    @AutoMap()
    email!: string;

    @AutoMap()
    displayName!: string;

    @AutoMap()
    createdAt!: Date;

    @AutoMap()
    updatedAt!: Date;
}
