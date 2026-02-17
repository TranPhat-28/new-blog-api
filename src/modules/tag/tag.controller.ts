import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { TagDetailsDto } from './dtos/responses/tag-details.dto';
import { CreateTagDto } from './dtos/requests/create-tag.dto';

@ApiTags('Tag')
@Controller('api/v1')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get('tags/:id')
    async findById(@Param('id') id: string): Promise<TagDetailsDto> {
        return await this.tagService.findById(id);
    }

    @Get('tags')
    async findAll(): Promise<TagDetailsDto[]> {
        return await this.tagService.findAll();
    }

    @Post('tags')
    async create(@Body() dto: CreateTagDto): Promise<TagDetailsDto> {
        return await this.tagService.create(dto);
    }
}
