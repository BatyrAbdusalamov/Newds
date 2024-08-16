import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostData } from './data/CreatePost.data';

@Controller('post')
export class PostController {
    constructor (private postService: PostService){}

    @Post('/create')
    createPost(@Body()postObject:CreatePostData){
        return this.postService.createPost(postObject);
    }

    @Get(':page')
    getAllPosts(@Param('page' , ParseIntPipe) page:number){
        return this.postService.getAllPosts(page);
    }

    @Get('/id:user')
    getPostsUser(@Param('user',ParseIntPipe) idPostUser:number){
        return this.postService.getPostsUser(idPostUser);
    }

    @Delete('/id:post')
    deletePostUser(@Param('post',ParseIntPipe) idPostUser:number){
        return this.postService.deletePostUser(idPostUser);
    }
}