import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(type => ID, { nullable: true })
  id: any;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(type => [ID], { nullable: true })
  watchListMovies?: any[];

  @Field(type => [ID], { nullable: true })
  likedMovies?: any[];
}

@InputType()
export class RegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}


