import { Body, Controller, Get, Post, } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostData } from './data/CreatePost.data';

@Controller('post')
export class PostController {
    constructor (private postService: PostService){}

    @Post('/create')
    createPost(@Body()postObject:CreatePostData){
        return this.postService.createPost(postObject);
    }

    @Get('/all')
    getAllPosts():Promise<object>{
        return this.postService.getAllPosts();
    }
}