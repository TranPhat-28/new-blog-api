import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class DummyEntity {
  @PrimaryKey()
  id!: number;
}
