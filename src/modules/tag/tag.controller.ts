import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { TagDetailsDto } from './dtos/responses/tag-details.dto';

@ApiTags('Tag')
@Controller('api/v1')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get('tags/:id')
    async findById(@Param('id') id: string): Promise<TagDetailsDto> {
        return await this.tagService.findById(id);
    }
}
