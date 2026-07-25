import { Migration } from '@mikro-orm/migrations';

export class Migration20260725165021_add_otp_model extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `create table "otp" ("id" uuid not null default gen_random_uuid(), "email" varchar(255) not null, "code_hash" varchar(255) not null, "purpose" varchar(255) not null, "expires_at" timestamptz not null, "created_at" timestamptz not null, constraint "otp_pkey" primary key ("id"));`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(`drop table if exists "otp" cascade;`);
    }
}
