import { AutoMap } from '@automapper/classes';

export class PostSummaryDto {
    @AutoMap()
    id!: string;

    @AutoMap()
    title!: string;

    @AutoMap()
    content!: string;

    @AutoMap()
    author!: string;

    @AutoMap()
    createdAt: Date = new Date();

    @AutoMap()
    updatedAt: Date = new Date();
}
