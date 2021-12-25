import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/user.model';
import { Model } from 'mongoose';
import { GraphQLError } from 'graphql';
import { LoginTypeResponse } from './auth.schema';
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<UserDocument>);
    getToken(email: any, _id: any): Promise<string>;
    login({ password, email }: {
        password: any;
        email: any;
    }): Promise<LoginTypeResponse | GraphQLError>;
}
