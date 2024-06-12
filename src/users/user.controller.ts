import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseBoolPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateUserData } from './data/CreateUser.data'
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async registerUser(@Body() registrationData: CreateUserData) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.userService.addNewUser({
                ...registrationData,
                password: hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
        } catch (error) { throw new HttpException(error, HttpStatus.BAD_REQUEST); }
    }

    @Get()
    async getAuthenticatedUser(@Body() login: string){}
}