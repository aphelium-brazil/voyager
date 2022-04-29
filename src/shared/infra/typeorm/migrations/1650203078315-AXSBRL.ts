import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class AXSBRL1650203078315 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "AXSBRL",

                columns: [
                    {
                        name: "id",

                        type: "uuid",

                        isPrimary: true,
                    },

                    {
                        name: "interval",

                        type: "enum",

                        enum: [
                            "1m",

                            "3m",

                            "5m",

                            "15m",

                            "30m",

                            "1h",

                            "2h",

                            "4h",

                            "6h",

                            "8h",

                            "12h",

                            "1d",

                            "3d",

                            "1w",

                            "1M",
                        ],
                    },

                    {
                        name: "swapId",

                        type: "uuid",
                    },

                    {
                        name: "timestamp",

                        type: "timestamp",
                    },

                    {
                        name: "open",

                        type: "decimal",
                    },

                    {
                        name: "close",

                        type: "decimal",
                    },

                    {
                        name: "high",

                        type: "decimal",
                    },

                    {
                        name: "low",

                        type: "decimal",
                    },

                    {
                        name: "volume",

                        type: "decimal",
                    },

                    {
                        name: "isClosed",

                        type: "boolean",
                    },

                    {
                        name: "createdAt",

                        type: "timestamp",

                        default: "now()",
                    },

                    {
                        name: "updatedAt",

                        type: "timestamp",

                        default: "now()",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "AXSBRL",

            new TableForeignKey({
                name: "FKAXSBRLSwapId",

                referencedTableName: "swaps",

                referencedColumnNames: ["id"],

                columnNames: ["swapId"],

                onDelete: "SET NULL",

                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("AXSBRL", "FKAXSBRLSwapId");

        await queryRunner.dropTable("AXSBRL");
    }
}
