import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { LoginTypeResponse } from './auth.schema';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService,
        ) {}
        
    @Mutation(() => LoginTypeResponse)
    async login( @Args('email') email: string, @Args('password') password: string)
        : Promise<LoginTypeResponse | GraphQLError> {
            try {
                return await this.authService.login({ email, password });
            } catch (err) {
                console.error(err);
            }
    }
}
