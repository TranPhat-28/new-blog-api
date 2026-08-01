import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyCodeDto {
    @AutoMap()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @Length(6, 6)
    code!: string;
}
