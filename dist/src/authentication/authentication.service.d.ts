import { CreateUserData } from "src/users/data/CreateUser.data";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/models/user.model";
import { JwtService } from "@nestjs/jwt";
export declare class AuthenticationService {
    private userRepository;
    private jwtService;
    constructor(userRepository: typeof User, jwtService: JwtService);
    register(registrationData: CreateUserData): Promise<User>;
    getAuthenticatedUser(data: CreateUserData): Promise<UnauthorizedException | {
        user: User;
        access_token: string;
    }>;
    private verifyPassword;
}
