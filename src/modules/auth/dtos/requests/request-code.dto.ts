import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestCodeDto {
    @AutoMap()
    @IsEmail()
    @IsNotEmpty()
    email!: string;
}
