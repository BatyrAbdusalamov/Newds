import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostData } from 'src/posts/data/CreatePost.data';
import { Post } from './models/post.model';
import { TagService } from 'src/tags/tag.service';
import { TagsPostsService } from 'src/tags-posts/tags-posts.service';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post) private postRepository: typeof Post, private tagService: TagService, private tagsPostsService: TagsPostsService) { }
    async createPost(postObject: CreatePostData,) {
        try {
            const Post:Post = await this.postRepository.create(postObject)
            const tag = await this.tagService.getIdTagsByPost(postObject.tag)
            console.log(tag,"1")
                tag.idTags.forEach(async (elementId: number) => await this.tagsPostsService.createAssociationTagsPosts(Post.id, elementId))
            return 'Post was successfully created';
        } catch (error) {
            return `ERROR: ${error}`;
        }
    }

}
