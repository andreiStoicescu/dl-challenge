import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Customer } from 'src/customer/model/customer.model';
import { Project } from 'src/project/model/project.model';
import { StatusEnum, TypeEnum } from './enums';

@ObjectType('Invoice')
export class Invoice {
  @Field(() => Int, { description: 'Id' })
  id: number;

  @Field()
  invoiceNumber: number;

  @Field()
  currency: string;

  @Field()
  amount: number;

  @Field()
  type: TypeEnum;

  @Field()
  status: StatusEnum;

  @Field()
  dueDate: Date;

  @Field()
  description: string;

  @Field()
  customer: Customer;

  @Field()
  project: Project;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  stornoInvoice: Invoice;
}
