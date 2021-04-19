import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCpfTable1615563949573 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'cpf',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },

        {
          name: 'cpf_number',
          type: 'varchar'
        },
        
        {
          name: 'name',
          type: 'varchar'
        },
        
        {
          name: 'address',
          type: 'varchar'
        },

        {
          name: 'city',
          type: 'varchar'
        },
        
        {
          name: 'contact',
          type: 'varchar'
        },

        {
          name: 'created_at',
          type: 'timestamptz',
          default: 'now()',
        },
      ]
    }));

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cpf');
    
  }

}
