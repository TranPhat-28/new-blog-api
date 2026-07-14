import { IsIn, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

export class PostQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc' = 'desc';
}
