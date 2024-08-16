import { UnauthorizedException } from "@nestjs/common";
import { CreateUserData } from "src/users/data/CreateUser.data";
import { User } from "src/users/models/user.model";
import { AuthenticationService } from "./authentication.service";
import { Response } from "express";
export declare class AuthenticationController {
    private authenticationService;
    constructor(authenticationService: AuthenticationService);
    addNewUser(data: CreateUserData, res: Response): Promise<User>;
    getByLogin(data: CreateUserData, res: Response): Promise<User | UnauthorizedException>;
}
