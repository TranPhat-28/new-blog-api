import { AutoMap } from '@automapper/classes';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTagDto {
    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    name!: string;
}
