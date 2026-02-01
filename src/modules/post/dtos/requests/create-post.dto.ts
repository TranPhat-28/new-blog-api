import { AutoMap } from '@automapper/classes';

export class CreatePostDto {
    @AutoMap()
    title!: string;

    @AutoMap()
    content!: string;
}
