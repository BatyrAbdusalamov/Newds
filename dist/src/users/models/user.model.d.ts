import { Model } from "sequelize-typescript";
interface UserCreation {
    id: number;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    photo: string;
}
export declare class User extends Model<User, UserCreation> {
    id: number;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    photo: string;
}
export {};
