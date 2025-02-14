import { Body, Controller, Get, Header, HttpException, Post, Query, Res, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserData } from "src/users/data/CreateUser.data";
import { User } from "src/users/models/user.model";
import { AuthenticationService } from "./authentication.service";
import { Response } from "express";
@Controller('auth')
export class AuthenticationController{
    constructor(private authenticationService:AuthenticationService) { }

    @Post('out')
    async addNewUser(@Body() userData: CreateUserData, @Res({ passthrough: true }) res:Response){
       const data = await this.authenticationService.register(userData);
       if(data instanceof HttpException) {
        res.statusCode = data.getStatus()
        return data};
        res.set('x-access-token',data[1].accessToken)
        res.set('x-refresh-token',data[1].refreshToken)
        return data[0];
    }
    @Post('in')
    async getByLogin(@Body() data, @Res({ passthrough: true }) res:Response){
        const userJwt = await this.authenticationService.getAuthenticatedUser(data);
        if(userJwt instanceof UnauthorizedException){ 
            res.statusCode = userJwt.getStatus()
            return userJwt.message };
        res.set('x-access-token',userJwt[1].accessToken)
        res.set('x-refresh-token',userJwt[1].refreshToken)
        return userJwt[0]
    }
}