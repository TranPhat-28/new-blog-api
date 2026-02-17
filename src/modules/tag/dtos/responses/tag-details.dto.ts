import { AutoMap } from '@automapper/classes';

export class TagDetailsDto {
    @AutoMap()
    id!: string;

    @AutoMap()
    name!: string;

    @AutoMap()
    createdAt: Date = new Date();

    @AutoMap()
    updatedAt: Date = new Date();
}
