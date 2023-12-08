import { Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Film {
  @Field(type => String)
  id: string;

  @Field()
  title: string;

  @Field()
  openingCrawl: string;

}
