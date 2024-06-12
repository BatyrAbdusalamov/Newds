import { Injectable } from "@nestjs/common";
import { TagsPosts } from "./tags-posts.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class TagsPostsService {
    constructor(@InjectModel(TagsPosts) private tagsPostsRepository: typeof TagsPosts){}

    async createAssociationTagsPosts(idPost:number,idTags:number):Promise<object>{
        return await this.tagsPostsRepository.create({idPosts: idPost,idTags:idTags});
    }
}