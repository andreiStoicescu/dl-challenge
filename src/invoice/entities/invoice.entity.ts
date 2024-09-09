import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeEnum, StatusEnum } from '../model/enums';

@Entity('invoice')
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    unique: true,
    default: () => `nextval('invoice_number_seq')`,
  })
  invoiceNumber: number;

  @Column()
  currency: string;

  @Column('decimal')
  amount: number;

  @Column({ default: TypeEnum.STANDARD })
  type: TypeEnum;

  @Column({ default: StatusEnum.UNPAID })
  status: StatusEnum;

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.invoices)
  customer: CustomerEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.invoices)
  project: ProjectEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => InvoiceEntity, (invoice) => invoice.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'stornoInvoiceId' })
  stornoInvoice: InvoiceEntity;
}
