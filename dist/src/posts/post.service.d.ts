import { HttpException } from '@nestjs/common';
import { CreatePostData } from 'src/posts/data/CreatePost.data';
import { Post } from './models/post.model';
import { TagService } from 'src/tags/tag.service';
import { TagsPostsService } from 'src/tags-posts/tags-posts.service';
export declare class PostService {
    private postRepository;
    private tagService;
    private tagsPostsService;
    constructor(postRepository: typeof Post, tagService: TagService, tagsPostsService: TagsPostsService);
    createPost(postObject: CreatePostData): Promise<HttpException>;
    getAllPosts(page?: number): Promise<Post[] | HttpException>;
    getPostsUser(idPostUser: number): Promise<Post[] | HttpException>;
    deletePostUser(idPostUser: number): Promise<HttpException>;
}
