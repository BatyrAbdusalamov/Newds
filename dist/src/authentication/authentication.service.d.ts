import { CreateUserData } from "src/users/data/CreateUser.data";
import { User } from "src/users/models/user.model";
export declare class AuthenticationService {
    private userRepository;
    constructor(userRepository: typeof User);
    register(registrationData: CreateUserData): Promise<User>;
    getAuthenticatedUser(data: CreateUserData): Promise<User>;
    private verifyPassword;
}
