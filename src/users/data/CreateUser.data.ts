import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserData {
    @IsNotEmpty() 
    @IsString()
    readonly login: string;
    @IsNotEmpty() 
    @IsString()
    readonly password: string;
    @IsNotEmpty() 
    @IsString()
    readonly firstName?: string;
    @IsNotEmpty() 
    @IsString()
    readonly lastName?: string;
    id: any;
}