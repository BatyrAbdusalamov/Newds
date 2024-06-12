import { CreateUserData } from "src/users/data/CreateUser.data";
import { User } from "src/users/models/user.model";
import { AuthenticationService } from "./authentication.service";
export declare class AuthenticationController {
    private authenticationService;
    constructor(authenticationService: AuthenticationService);
    addNewUser(data: CreateUserData): Promise<User>;
    getByLogin(data: CreateUserData): Promise<User>;
}
