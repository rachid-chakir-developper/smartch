import { UseGuards } from '@nestjs/common';
import { Args, Int, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/user.model';
import { ActionRespenseType, LikeAndWatchType, MovieType, PaginatorInput } from './movie.schema';
import { MoviesService } from './movies.service';

@Resolver()
export class MoviesResolver {
    constructor(
        private moviesService: MoviesService,
      ) {}

      @Mutation(() => ActionRespenseType)
      @UseGuards(GqlAuthGuard)
      async likeThisMovie(@CurrentUser() user: User, @Args('id', { type: () => ID }) id: number) {
        let done = false;
        try {
          await this.moviesService.likeThisMovie(user, id).then(()=>{
            done = true
          });
          return {
              done
          }
        } catch (err) {
          console.error(err);
        }
      }

      @Mutation(() => ActionRespenseType)
      @UseGuards(GqlAuthGuard)
      async addMovieToWatchList(@CurrentUser() user: User, @Args('id', { type: () => ID }) id: number) {
        let done = false;
        try {
          await this.moviesService.addMovieToWatchList(user, id).then(()=>{
            done = true
          });
          return {
              done
          }
        } catch (err) {
          console.error(err);
        }
      }
      @Query(returns => [MovieType])
      async movies(@Args('input') paginatorInput: PaginatorInput) {
        return this.moviesService.findAll(paginatorInput).toPromise()
      }

      @Query(returns => [ID])
      async likedMovies(@CurrentUser() user: User) {
        return user.watchListMovies;
      }

      @Query(returns => LikeAndWatchType)
      @UseGuards(GqlAuthGuard)
      async likeAndWatchList(@CurrentUser() user: User) {
        return this.moviesService.findLikeAndWatchList(user);
      }
}
