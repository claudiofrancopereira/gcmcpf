import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAbordagensTable1615564950957 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'abordagens',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },

        {
          name: 'cpf_id',
          type: 'varchar',
        },

        {
          name: 'location',
          type: 'varchar',
        },

        {
          name: 'gcm',
          type: 'varchar',
        },

        {
          name: 'obs',
          type: 'text',
          isNullable: true
        },

        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],

      foreignKeys: [
        {
          name: 'abordagemCPF',
          columnNames: ['cpf_id'],
          referencedTableName: 'cpf',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }));

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('abordagens');
  }

}
