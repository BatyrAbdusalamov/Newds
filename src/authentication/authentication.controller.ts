import { Body, Controller, Get, Header, Post, Query, Res, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserData } from "src/users/data/CreateUser.data";
import { User } from "src/users/models/user.model";
import { AuthenticationService } from "./authentication.service";
import { Response } from "express";
@Controller('auth')
export class AuthenticationController{
    constructor(private authenticationService:AuthenticationService) { }

    @Post()
    async addNewUser(@Body() data: CreateUserData, @Res({ passthrough: true }) res:Response){
       const userJwt = await this.authenticationService.register(data);
       if(userJwt instanceof UnauthorizedException) return userJwt;
        res.set('x-access-token',userJwt.refresh)
        return userJwt;
    }
    @Get()
    async getByLogin(@Body() data:CreateUserData, @Res({ passthrough: true }) res:Response){
        const userJwt = await this.authenticationService.getAuthenticatedUser(data);
        if(userJwt instanceof UnauthorizedException) return userJwt;
        res.set('x-access-token',userJwt.access_token)
        return userJwt.user
    }
}