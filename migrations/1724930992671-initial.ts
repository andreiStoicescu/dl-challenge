import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1724930992671 implements MigrationInterface {
  name = 'Initial1724930992671';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1337;`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "cif" character varying NOT NULL, "iban" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "invoiceNumber" integer NOT NULL DEFAULT nextval('invoice_number_seq'), "currency" character varying NOT NULL, "amount" numeric NOT NULL, "type" character varying NOT NULL DEFAULT 'standard', "status" character varying NOT NULL DEFAULT 'unpaid', "dueDate" TIMESTAMP NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" integer, "projectId" integer, "stornoInvoiceId" integer, CONSTRAINT "UQ_d7bed97fb47876e03fd7d7c285a" UNIQUE ("invoiceNumber"), CONSTRAINT "REL_8135c6010223d1c75f66b5c599" UNIQUE ("stornoInvoiceId"), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_925aa26ea12c28a6adb614445ee" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_eca8013d9719930683f74ae7e10" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_8135c6010223d1c75f66b5c599e" FOREIGN KEY ("stornoInvoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_8135c6010223d1c75f66b5c599e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_eca8013d9719930683f74ae7e10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_925aa26ea12c28a6adb614445ee"`,
    );
    await queryRunner.query(`DROP TABLE "invoice"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
