import { AutoMap } from '@automapper/classes';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateCommentDto {
    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(1000)
    content!: string;
}
