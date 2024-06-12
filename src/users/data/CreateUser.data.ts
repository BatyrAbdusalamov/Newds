import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserData {
    @IsNotEmpty() 
    @IsString()
    readonly login: string;
    readonly password: string;
    readonly firstName?: string;
    readonly lastName?: string;
}