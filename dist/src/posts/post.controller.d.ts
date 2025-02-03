import { PostService } from './post.service';
import { CreatePostData } from './data/CreatePost.data';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    createPost(postObject: CreatePostData): Promise<import("@nestjs/common").HttpException>;
    getAllPosts(page: any): Promise<import("./models/post.model").Post[] | import("@nestjs/common").HttpException>;
    getPostsUser(idPostUser: number): Promise<import("./models/post.model").Post[] | import("@nestjs/common").HttpException>;
    deletePostUser(idPostUser: number): Promise<import("@nestjs/common").HttpException>;
}
