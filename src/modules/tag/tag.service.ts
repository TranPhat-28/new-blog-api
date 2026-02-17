import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Tag } from './tag.entity';
import { TagDetailsDto } from './dtos/responses/tag-details.dto';

@Injectable()
export class TagService {
    constructor(
        private readonly em: EntityManager,
        @InjectMapper() private readonly mapper: Mapper,
    ) {}

    async findById(id: string): Promise<TagDetailsDto> {
        const tag = await this.em.findOneOrFail(Tag, { id });

        return this.mapper.map(tag, Tag, TagDetailsDto);
    }
}
