import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1708763653523 implements MigrationInterface {
  name = 'NewMigration1708763653523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(500) NOT NULL, \`description\` text NOT NULL, \`status\` int NOT NULL DEFAULT '0', \`media\` text NOT NULL, \`authorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(500) NOT NULL, \`password\` varchar(500) NOT NULL, \`email\` varchar(500) NOT NULL, \`is_admin\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_c56120106977cc14f975726af07\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_c56120106977cc14f975726af07\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`todo\``);
  }
}
