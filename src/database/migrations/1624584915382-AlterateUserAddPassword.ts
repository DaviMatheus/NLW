import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterateUserAddPassword1624584915382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                "name": "password",
                "type": "varchan",
                isNullable: true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "password")
    }

}
