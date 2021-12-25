import { UserType } from "src/user/user.schema";
export declare class LoginInput {
    email: string;
    password: string;
}
export declare class LoginTypeResponse {
    user: UserType;
    accessToken?: string;
}
