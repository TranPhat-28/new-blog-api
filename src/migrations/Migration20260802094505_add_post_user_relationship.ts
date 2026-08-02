import { Migration } from '@mikro-orm/migrations';

export class Migration20260802094505_add_post_user_relationship extends Migration {
    override async up(): Promise<void> {
        this.addSql(`alter table "post" add column "author_id" uuid not null;`);
        this.addSql(
            `alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(
            `alter table "post" drop constraint "post_author_id_foreign";`,
        );

        this.addSql(`alter table "post" drop column "author_id";`);
    }
}
