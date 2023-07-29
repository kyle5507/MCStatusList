'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230614174212 extends Migration {

  async up() {
    this.addSql('create table `mc_server` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `ip` text not null, `channel_id` text not null, `guild_id` text not null, `message_id` text not null, `deleted` integer not null default false, `last_interact` datetime not null, unique (`id`));');
  }

}
exports.Migration20230614174212 = Migration20230614174212;
