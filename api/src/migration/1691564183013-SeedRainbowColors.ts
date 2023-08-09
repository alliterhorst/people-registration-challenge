import { Color } from 'src/color/color.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRainbowColors1691564183013 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<Color>(Color, {
        color: '#FF0000',
        name: 'Vermelho',
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Color>(Color, {
        color: '#FF7F00',
        name: 'Laranja',
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Color>(Color, {
        color: '#FFFF00',
        name: 'Amarelo',
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Color>(Color, {
        color: '#00FF00',
        name: 'Verde',
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Color>(Color, {
        color: '#0000FF',
        name: 'Azul',
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Color>(Color, {
        color: '#2E2B5F',
        name: 'Indigo',
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Color>(Color, {
        color: '#8B00FF',
        name: 'Violeta',
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "color"`);
  }
}
