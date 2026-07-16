import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

export class PostQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsIn(['createdAt', 'title'])
    sortBy: 'createdAt' | 'title' = 'createdAt';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc' = 'desc';

    @IsOptional()
    @IsString()
    @MaxLength(100)
    search?: string;

    @IsOptional()
    @IsUUID()
    tagId?: string;
}
