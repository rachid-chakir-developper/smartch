import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MovieType {
  @Field(type => ID, { nullable: true })
  id: any;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  poster_path?: string;
}

@InputType()
export class PaginatorInput {
    @Field()
    query: string;

    @Field(type => Int)
    page: number;
}

@ObjectType()
export class LikeAndWatchType {
  @Field(type => [ID], { nullable: true })
  likedMovies?: any[];

  @Field(type => [MovieType], { nullable: true })
  watchListMovies?: MovieType[];
}

@ObjectType()
export class ActionRespenseType {
  @Field()
  done: boolean;
}


