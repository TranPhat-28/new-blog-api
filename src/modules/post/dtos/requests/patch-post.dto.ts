import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class PatchPostDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(200)
    title?: string;

    @IsOptional()
    @IsString()
    @MinLength(10)
    @MaxLength(5000)
    content?: string;
}
