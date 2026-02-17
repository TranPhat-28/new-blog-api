import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { TagDetailsDto } from './dtos/responses/tag-details.dto';
import { CreateTagDto } from './dtos/requests/create-tag.dto';

@Injectable()
export class TagProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            /* Entity to Response DTOs */
            createMap(mapper, Tag, TagDetailsDto);

            /* Request DTOs to Entity */
            createMap(mapper, CreateTagDto, Tag);
        };
    }
}
