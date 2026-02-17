import { AutoMap } from '@automapper/classes';

export class CreateTagDto {
    @AutoMap()
    name!: string;
}
