import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { RegisterInput } from './user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    register(registerInput: RegisterInput): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findOneById(id: any): void;
    findOne(username: string): Promise<User>;
    findAll(): Promise<User[]>;
}
