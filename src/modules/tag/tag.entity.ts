import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Tag {
    @AutoMap()
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    id!: string;

    @AutoMap()
    @Property({ unique: true })
    name!: string;

    @AutoMap()
    @Property()
    createdAt: Date = new Date();

    @AutoMap()
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
