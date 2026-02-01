import { AutoMap } from '@automapper/classes';

export class CommentDto {
    @AutoMap()
    id!: string;

    @AutoMap()
    content!: string;

    @AutoMap()
    createdAt!: Date;

    @AutoMap()
    updatedAt?: Date;
}
