import { UserService } from './user.service';
import { RegisterInput } from './user.schema';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    register(registerInput: RegisterInput): Promise<import("./user.model").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    user(id: number): Promise<void>;
    users(): Promise<import("./user.model").User[]>;
}
