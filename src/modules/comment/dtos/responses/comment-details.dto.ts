import { AutoMap } from '@automapper/classes';

export class CommentDetailsDto {
    @AutoMap()
    id!: string;

    @AutoMap()
    content!: string;

    @AutoMap()
    createdAt!: Date;

    @AutoMap()
    updatedAt?: Date;

    @AutoMap()
    author!: string;
}
