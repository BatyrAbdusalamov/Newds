import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostData } from 'src/posts/data/CreatePost.data';
import { Post } from './models/post.model';
import { TagService } from 'src/tags/tag.service';
import { TagsPostsService } from 'src/tags-posts/tags-posts.service';
import { Tag } from 'src/tags/models/tag.model';
import { TagsPosts } from 'src/tags-posts/models/tags-posts.model';
import { CreateTagsPost } from 'src/tags-posts/data/CreateTagsPost.data';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post) private postRepository: typeof Post, private tagService: TagService, private tagsPostsService: TagsPostsService) { }
    async createPost(postObject: CreatePostData) {
        try {
            const Post: Post = await this.postRepository.create(postObject)
            if(!postObject.tag) return 'Post was successfully created';
            const tag = await this.tagService.getIdTagsByPost(postObject.tag)
            const tagsPosts = tag.idTags.map((elementId: number): CreateTagsPost => { return { idPosts: Post.id, idTags: elementId } })
            console.log(tagsPosts);
            this.tagsPostsService.createAssociationTagsPosts(tagsPosts)
            return 'Post was successfully created';
        } catch (error) {
            return `ERROR: ${error}`;
        }
    }

    async getAllPosts(): Promise<object> {
        return this.postRepository.findAll({ include: Tag });
    }

}
