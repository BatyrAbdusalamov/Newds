import { CreateUserData } from "src/users/data/CreateUser.data";
import { HttpException, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/models/user.model";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
interface Tokens {
    accessToken: string;
    refreshToken: string;
}
export declare class AuthenticationService {
    private userRepository;
    private jwtService;
    private configService;
    constructor(userRepository: typeof User, jwtService: JwtService, configService: ConfigService);
    register(registrationData: CreateUserData): Promise<HttpException | [CreateUserData, Tokens]>;
    getAuthenticatedUser(data: CreateUserData): Promise<UnauthorizedException | [CreateUserData, Tokens]>;
    private verifyPassword;
    private createJwtTokens;
}
export {};
