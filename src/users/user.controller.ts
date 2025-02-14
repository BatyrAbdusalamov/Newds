import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { CreateUserData } from './data/CreateUser.data'
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get(':id')
    getUserPosts(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserPosts(id);
    }

    @Get()
    getAuthenticatedUser(@Body() login: string, response: Response) {
        response.cookie('access_token', 'tokens!!!!!!!', {
            expires: new Date(new Date().getTime() + +process.env.LIFE_ACCESS_TOKEN),
            secure: false,
            sameSite: 'lax',
            httpOnly: true,
          });
          return response;
     }
}