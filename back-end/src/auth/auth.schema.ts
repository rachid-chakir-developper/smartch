import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { UserType } from "src/user/user.schema";

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginTypeResponse {
  @Field(type => UserType)
  user: UserType;

  @Field({ nullable: true })
  accessToken?: string;
}