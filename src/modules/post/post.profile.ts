import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/requests/create-post.dto';
import { PostDetailsDto } from './dtos/responses/post-details.dto';
import { PostSummaryDto } from './dtos/responses/post-summary.dto';
import { Post } from './post.entity';
import { CommentDetailsDto } from '../comment/dtos/responses/comment-details.dto';
import { Comment } from '../comment/comment.entity';

@Injectable()
export class PostProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            /* Entity to Response DTOs */
            createMap(
                mapper,
                Post,
                PostDetailsDto,
                forMember(
                    (d) => d.comments,
                    mapFrom((s) =>
                        s.comments
                            .getItems()
                            .map((comment) =>
                                mapper.map(comment, Comment, CommentDetailsDto),
                            ),
                    ),
                ),
                forMember(
                    (d) => d.author,
                    mapFrom((s) => s.author.displayName),
                ),
            );

            createMap(
                mapper,
                Post,
                PostSummaryDto,
                forMember(
                    (d) => d.author,
                    mapFrom((s) => s.author.displayName),
                ),
            );

            /* Request DTOs to Entity */
            createMap(mapper, CreatePostDto, Post);
        };
    }
}
