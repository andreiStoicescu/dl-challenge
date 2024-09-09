import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceInput {
  @Field({ description: 'currency' })
  currency: string;

  @Field(() => Int, { description: 'amount' })
  amount: number;

  @Field({ description: 'dueDate' })
  dueDate: Date;

  @Field({ description: 'description' })
  description: string;

  @Field()
  customerId: number;

  @Field()
  projectId: number;
}
