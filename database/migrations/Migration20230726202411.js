'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230726202411 extends Migration {

  async up() {
    this.addSql('alter table `mc_server` add column `img_url` text not null;');
  }

}
exports.Migration20230726202411 = Migration20230726202411;
