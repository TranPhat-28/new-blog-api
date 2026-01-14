import { Migration } from '@mikro-orm/migrations';

export class Migration20260114131346_add_comment_entity extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "comment" ("id" uuid not null default gen_random_uuid(), "content" text not null, "post_id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "comment_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "comment" add constraint "comment_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "comment" cascade;`);
  }
}
