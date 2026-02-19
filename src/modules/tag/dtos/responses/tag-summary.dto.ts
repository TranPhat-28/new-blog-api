import { AutoMap } from '@automapper/classes';

export class TagSummaryDto {
    @AutoMap()
    id!: string;

    @AutoMap()
    name!: string;
}
