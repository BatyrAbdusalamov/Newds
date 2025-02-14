import { HttpException } from '@nestjs/common';
import { User } from './models/user.model';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: typeof User);
    getUserPosts(id: number): Promise<User | HttpException>;
    getByLogin(login: string): Promise<User | HttpException>;
}
