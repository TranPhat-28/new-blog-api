import { AutoMap } from '@automapper/classes';
import { CommentDetailsDto } from '../../../comment/dtos/responses/comment-details.dto';

export class PostDetailsDto {
    @AutoMap()
    id!: string;

    @AutoMap()
    title!: string;

    @AutoMap()
    content!: string;

    @AutoMap(() => [CommentDetailsDto])
    comments: CommentDetailsDto[] = [];

    @AutoMap()
    createdAt: Date = new Date();

    @AutoMap()
    updatedAt: Date = new Date();
}
