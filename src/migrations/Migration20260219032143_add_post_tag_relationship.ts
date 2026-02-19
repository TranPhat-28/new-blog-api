import { Migration } from '@mikro-orm/migrations';

export class Migration20260219032143_add_post_tag_relationship extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `create table "post_tags" ("post_id" uuid not null, "tag_id" uuid not null, constraint "post_tags_pkey" primary key ("post_id", "tag_id"));`,
        );

        this.addSql(
            `alter table "post_tags" add constraint "post_tags_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;`,
        );
        this.addSql(
            `alter table "post_tags" add constraint "post_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(`drop table if exists "post_tags" cascade;`);
    }
}
