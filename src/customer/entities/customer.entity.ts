import { InvoiceEntity } from 'src/invoice/entities/invoice.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cif: string;

  @Column()
  iban: string;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.customer)
  invoices: InvoiceEntity[];
}
