import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Otp {
    @AutoMap()
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    id!: string;

    @AutoMap()
    @Property()
    email!: string;

    @AutoMap()
    @Property()
    codeHash!: string;

    @AutoMap()
    @Property()
    purpose!: string;

    @AutoMap()
    @Property()
    expiresAt!: Date;

    @AutoMap()
    @Property()
    createdAt: Date = new Date();
}
