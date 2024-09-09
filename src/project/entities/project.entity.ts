import { InvoiceEntity } from 'src/invoice/entities/invoice.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.project)
  invoices: InvoiceEntity[];
}
