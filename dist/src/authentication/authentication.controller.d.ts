import { HttpException } from "@nestjs/common";
import { CreateUserData } from "src/users/data/CreateUser.data";
import { AuthenticationService } from "./authentication.service";
import { Response } from "express";
export declare class AuthenticationController {
    private authenticationService;
    constructor(authenticationService: AuthenticationService);
    addNewUser(userData: CreateUserData, res: Response): Promise<CreateUserData | HttpException>;
    getByLogin(data: any, res: Response): Promise<string | CreateUserData>;
}
