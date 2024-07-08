import { HttpException } from '@nestjs/common';
import { CreateUserData } from './data/CreateUser.data';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserPosts(id: number): Promise<import("./models/user.model").User | HttpException>;
    registerUser(registrationData: CreateUserData): Promise<import("./models/user.model").User | HttpException>;
    getAuthenticatedUser(login: string): void;
}
