import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { TagDetailsDto } from './dtos/responses/tag-details.dto';
import { CreateTagDto } from './dtos/requests/create-tag.dto';
import { TagQueryDto } from './dtos/requests/tag-query.dto';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';

@ApiTags('Tag')
@Controller('api/v1')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get('tags/:id')
    async findById(@Param('id') id: string): Promise<TagDetailsDto> {
        return await this.tagService.findById(id);
    }

    @Get('tags')
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
    })
    @ApiQuery({
        name: 'order',
        required: false,
        type: String,
    })
    async findAll(
        @Query() query: TagQueryDto,
    ): Promise<PaginatedResponseDto<TagDetailsDto>> {
        return await this.tagService.findAll(query);
    }

    @Post('tags')
    async create(@Body() dto: CreateTagDto): Promise<TagDetailsDto> {
        return await this.tagService.create(dto);
    }

    @Delete('tags/:id')
    async delete(@Param('id') id: string): Promise<void> {
        return await this.tagService.delete(id);
    }
}
