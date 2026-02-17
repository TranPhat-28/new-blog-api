import { Migration } from '@mikro-orm/migrations';

export class Migration20260217073133_add_tag_entity extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `create table "tag" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "tag_pkey" primary key ("id"));`,
        );
        this.addSql(
            `alter table "tag" add constraint "tag_name_unique" unique ("name");`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(`drop table if exists "tag" cascade;`);
    }
}
