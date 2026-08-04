import { AutoMap } from '@automapper/classes';
import { TagSummaryDto } from 'src/modules/tag/dtos/responses/tag-summary.dto';
import { CommentDetailsDto } from '../../../comment/dtos/responses/comment-details.dto';

export class PostDetailsDto {
    @AutoMap()
    id!: string;

    @AutoMap()
    title!: string;

    @AutoMap()
    content!: string;

    @AutoMap()
    author!: string;

    @AutoMap(() => [CommentDetailsDto])
    comments: CommentDetailsDto[] = [];

    @AutoMap(() => [TagSummaryDto])
    tags: TagSummaryDto[] = [];

    @AutoMap()
    createdAt: Date = new Date();

    @AutoMap()
    updatedAt: Date = new Date();
}
