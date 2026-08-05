import { Migration } from '@mikro-orm/migrations';

export class Migration20260805105659_add_comment_user_relationship extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `alter table "comment" add column "author_id" uuid not null;`,
        );
        this.addSql(
            `alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(
            `alter table "comment" drop constraint "comment_author_id_foreign";`,
        );

        this.addSql(`alter table "comment" drop column "author_id";`);
    }
}
