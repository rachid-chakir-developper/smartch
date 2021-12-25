import { GraphQLError } from 'graphql';
import { LoginTypeResponse } from './auth.schema';
import { AuthService } from './auth.service';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<LoginTypeResponse | GraphQLError>;
}
