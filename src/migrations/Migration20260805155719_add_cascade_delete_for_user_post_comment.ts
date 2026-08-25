import { Migration } from '@mikro-orm/migrations';

export class Migration20260805155719_add_cascade_delete_for_user_post_comment extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `alter table "post" drop constraint "post_author_id_foreign";`,
        );

        this.addSql(
            `alter table "comment" drop constraint "comment_author_id_foreign";`,
        );

        this.addSql(
            `alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade on delete cascade;`,
        );

        this.addSql(
            `alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade on delete cascade;`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(
            `alter table "post" drop constraint "post_author_id_foreign";`,
        );

        this.addSql(
            `alter table "comment" drop constraint "comment_author_id_foreign";`,
        );

        this.addSql(
            `alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;`,
        );

        this.addSql(
            `alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;`,
        );
    }
}
