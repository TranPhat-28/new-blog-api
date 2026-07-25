import { AutoMap } from '@automapper/classes';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @AutoMap()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    displayName!: string;
}
