import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateTagDto } from './dtos/requests/create-tag.dto';
import { TagDetailsDto } from './dtos/responses/tag-details.dto';
import { Tag } from './tag.entity';

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

    async findAll(query: PaginationQueryDto): Promise<TagDetailsDto[]> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;

        const tags = await this.em.find(Tag, {}, { limit, offset });

        return this.mapper.mapArray(tags, Tag, TagDetailsDto);
    }

    async create(dto: CreateTagDto): Promise<TagDetailsDto> {
        const existingTag = await this.em.findOne(Tag, { name: dto.name });

        if (existingTag) {
            throw new InternalServerErrorException();
        }

        const tag = this.mapper.map(dto, CreateTagDto, Tag);
        await this.em.persist(tag).flush();

        return this.mapper.map(tag, Tag, TagDetailsDto);
    }

    async delete(id: string): Promise<void> {
        const tag = await this.em.findOneOrFail(Tag, { id });

        await this.em.remove(tag).flush();
    }
}
