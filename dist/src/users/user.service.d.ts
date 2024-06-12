import { User } from './models/user.model';
import { CreateUserData } from 'src/users/data/CreateUser.data';
export declare class UserService {
    private userRepository;
    constructor(userRepository: typeof User);
    addNewUser(data: CreateUserData): Promise<User>;
    getByLogin(login: string): Promise<User>;
}
