import { Model } from "sequelize-typescript";
import { Post } from "src/posts/models/post.model";
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
    posts: Post[];
}
export {};
