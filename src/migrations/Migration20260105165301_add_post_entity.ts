import { Migration } from '@mikro-orm/migrations';

export class Migration20260105165301_add_post_entity extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "post" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "content" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "post_pkey" primary key ("id"));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "post" cascade;`);
  }
}
