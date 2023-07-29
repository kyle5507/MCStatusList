'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230726202731 extends Migration {

  async up() {
    this.addSql('PRAGMA foreign_keys = OFF;');
    this.addSql('CREATE TABLE `_knex_temp_alter321` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, `ip` text NOT NULL, `channel_id` text NOT NULL, `guild_id` text NOT NULL, `message_id` text NOT NULL, `deleted` integer NOT NULL DEFAULT false, `last_interact` datetime NOT NULL, `name` text NOT NULL, `channel2id` text, `message2id` text, `website` text, `img_url` text, UNIQUE (`id`));');
    this.addSql('INSERT INTO "_knex_temp_alter321" SELECT * FROM "mc_server";;');
    this.addSql('DROP TABLE "mc_server";');
    this.addSql('ALTER TABLE "_knex_temp_alter321" RENAME TO "mc_server";');
    this.addSql('PRAGMA foreign_keys = ON;');
  }

}
exports.Migration20230726202731 = Migration20230726202731;
