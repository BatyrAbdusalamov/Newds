import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateUserData } from './data/CreateUser.data'
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get(':id')
    getUserPosts(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserPosts(id);
    }

    @Post()
    registerUser(@Body() registrationData: CreateUserData) {
        return this.userService.addNewUser(registrationData);
    }

    @Get()
    getAuthenticatedUser(@Body() login: string) { }
}