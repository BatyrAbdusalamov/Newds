import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    async createPost(postObject: CreatePostData): Promise<HttpException> {
        try {
            const Post: Post = await this.postRepository.create(postObject)
            if (!postObject.tag) new HttpException(Post, HttpStatus.CREATED, { 'description': 'Post was successfully created' });
            const tag = await this.tagService.getIdTagsByPost(postObject.tag)
            const tagsPosts = tag.idTags.map((elementId: number): CreateTagsPost => { return { idPosts: Post.id, idTags: elementId } })
            console.log(tagsPosts);
            this.tagsPostsService.createAssociationTagsPosts(tagsPosts)
            return new HttpException(Post, HttpStatus.CREATED, { 'description': 'Post was successfully created' });
        } catch (error) { return new HttpException(error, 500); }
    }

    async getAllPosts(page: number = 0): Promise<Post[] | HttpException> {
        try {
            const startPost = page * 10;
            const posts: Post[] = await this.postRepository.findAll({
                offset: ((startPost < 0) ? 0 : startPost), limit: 10,
                include: [{ model: Tag, attributes: ['id', 'nameTag'], through: { attributes: [] } }]
            });
            return posts
        } catch (error) { return new HttpException(error, 500); }
    }

    async getPostsUser(idPostUser:number){
        try{
             return  await this.postRepository.findAll({where:{idPostUser}})
        }
        catch(error){
            return new HttpException(error,500)
        }
    }
    async deletePostUser(idPostUser:number){
        try{
            const deletePost:number = await this.postRepository.destroy({where:{id:idPostUser}})
            if(deletePost==0) return new HttpException('Resource does not exist',404)
            return new HttpException('Not Content',204)
        }
        catch(error){
            return new HttpException(error,500)
        }
    }
}
