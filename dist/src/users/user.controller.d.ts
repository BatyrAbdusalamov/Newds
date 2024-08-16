import { HttpException } from '@nestjs/common';
import { CreateUserData } from './data/CreateUser.data';
import { UserService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserPosts(id: number): Promise<import("./models/user.model").User | HttpException>;
    registerUser(registrationData: CreateUserData): Promise<HttpException | {
        user: CreateUserData;
        accessToken: string;
        refreshToken: string;
    }>;
    getAuthenticatedUser(login: string, response: Response): Response<any, Record<string, any>>;
}
