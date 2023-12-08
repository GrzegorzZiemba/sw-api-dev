import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Planet {
  @Field()
  name: string;

  @Field()
  climate: string;

  @Field()
  terrain: string;

}