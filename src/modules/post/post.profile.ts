import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Comment } from '../comment/comment.entity';
import { CommentDto } from '../comment/dtos/comment.dto';
import { PostDetailsDto } from './dtos/responses/post-details.dto';
import { PostSummaryDto } from './dtos/responses/post-summary.dto';
import { Post } from './post.entity';
import { CreatePostDto } from './dtos/requests/create-post.dto';

@Injectable()
export class PostProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Comment, CommentDto);

            /* Entity to Response DTOs */
            createMap(
                mapper,
                Post,
                PostDetailsDto,
                forMember(
                    (d) => d.comments,
                    mapFrom((s) => s.comments.getItems()),
                ),
            );

            createMap(mapper, Post, PostSummaryDto);

            /* Request DTOs to Entity */
            createMap(mapper, CreatePostDto, Post);
        };
    }
}
