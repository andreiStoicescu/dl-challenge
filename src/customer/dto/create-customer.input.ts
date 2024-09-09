import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field({ description: 'Name' })
  name: string;

  @Field({ description: 'Email' })
  email: string;

  @Field({ description: 'Email' })
  cif: string;

  @Field({ description: 'iban' })
  iban: string;
}
