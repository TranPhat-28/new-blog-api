import { AutoMap } from '@automapper/classes';
import { CommentDto } from '../../../comment/dtos/comment.dto';

export class PostDetailsDto {
    @AutoMap()
    id!: string;

    @AutoMap()
    title!: string;

    @AutoMap()
    content!: string;

    @AutoMap(() => [CommentDto])
    comments: CommentDto[] = [];

    @AutoMap()
    createdAt: Date = new Date();

    @AutoMap()
    updatedAt: Date = new Date();
}
