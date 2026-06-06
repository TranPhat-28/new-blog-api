import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class UpdatePostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(5000)
    content!: string;
}
