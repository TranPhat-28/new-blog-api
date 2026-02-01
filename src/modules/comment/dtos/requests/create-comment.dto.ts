import { AutoMap } from '@automapper/classes';

export class CreateCommentDto {
    @AutoMap()
    content!: string;
}
