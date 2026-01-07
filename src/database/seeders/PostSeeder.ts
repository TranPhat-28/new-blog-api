import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PostFactory } from '../factories/PostFactory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new PostFactory(em).make(10);
  }
}
