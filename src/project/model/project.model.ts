import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Project')
export class Project {
  @Field(() => Int, { description: 'Id' })
  id: number;

  @Field({ description: 'Name' })
  name: string;
}
