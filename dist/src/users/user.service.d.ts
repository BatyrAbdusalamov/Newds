import { HttpException } from '@nestjs/common';
import { User } from './models/user.model';
import { CreateUserData } from 'src/users/data/CreateUser.data';
import { TokenService } from 'src/token/token.service';
export declare class UserService {
    private readonly userRepository;
    private tokenService;
    constructor(userRepository: typeof User, tokenService: TokenService);
    getUserPosts(id: number): Promise<User | HttpException>;
    addNewUser(registrationData: CreateUserData): Promise<{
        user: CreateUserData;
        accessToken: string;
        refreshToken: string;
    } | HttpException>;
    getByLogin(login: string): Promise<User | HttpException>;
}
