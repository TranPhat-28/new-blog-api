import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CommentDetailsDto } from './dtos/responses/comment-details.dto';
import { CreateCommentDto } from './dtos/requests/create-comment.dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            /* Entity to Response DTOs */
            createMap(mapper, Comment, CommentDetailsDto);

            /* Request DTOs to Entity */
            createMap(mapper, CreateCommentDto, Comment);
        };
    }
}
