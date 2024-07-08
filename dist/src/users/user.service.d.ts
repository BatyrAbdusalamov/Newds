import { HttpException } from '@nestjs/common';
import { User } from './models/user.model';
import { CreateUserData } from 'src/users/data/CreateUser.data';
export declare class UserService {
    private userRepository;
    constructor(userRepository: typeof User);
    getUserPosts(id: number): Promise<User | HttpException>;
    addNewUser(registrationData: CreateUserData): Promise<User | HttpException>;
    getByLogin(login: string): Promise<User | HttpException>;
}
