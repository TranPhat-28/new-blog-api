import { AutoMap } from '@automapper/classes';

export class UpdateCommentDto {
    @AutoMap()
    content!: string;
}
