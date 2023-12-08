import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Species {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field()
  classification: string;

  @Field()
  designation: string;

  @Field()
  average_height: string;

  @Field()
  skin_colors: string;

  @Field()
  hair_colors: string;

  @Field()
  eye_colors: string;

  @Field()
  average_lifespan: string;

  @Field()
  language: string;
}
