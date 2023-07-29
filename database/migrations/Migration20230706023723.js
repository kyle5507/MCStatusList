'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230706023723 extends Migration {

  async up() {
    this.addSql('alter table `mc_server` add column `name` text not null;');
    this.addSql('alter table `mc_server` add column `channel2id` text not null;');
    this.addSql('alter table `mc_server` add column `message2id` text not null;');
    this.addSql('alter table `mc_server` add column `website` text not null;');
  }

}
exports.Migration20230706023723 = Migration20230706023723;
