import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Customer')
export class Customer {
  @Field(() => Int, { description: 'Id' })
  id: number;

  @Field({ description: 'Name' })
  name: string;

  @Field({ description: 'Email' })
  email: string;

  @Field({ description: 'Email' })
  cif: string;

  @Field({ description: 'iban' })
  iban: string;
}
