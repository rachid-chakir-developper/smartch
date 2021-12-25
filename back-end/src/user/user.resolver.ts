import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType, RegisterInput} from './user.schema';

@Resolver(of => UserType)
export class UserResolver {
    constructor(
        private userService: UserService,
      ) {}
      @Mutation(() => UserType)
      async register(@Args('input') registerInput: RegisterInput) {
        try {
          return await this.userService.register(registerInput);
        } catch (err) {
          console.error(err);
        }
      }

      @Query(returns => UserType)
      async user(@Args('id', { type: () => Int }) id: number) {
        return this.userService.findOneById(id);
      }
      @Query(returns => [UserType])
      async users() {
        return this.userService.findAll();
      }
}
