import { AutoMap } from '@automapper/classes';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreatePostDto {
    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    title!: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(5000)
    content!: string;
}
