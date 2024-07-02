import { Injectable } from "@nestjs/common";
import { TagsPosts } from "./models/tags-posts.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTagsPost } from "./data/CreateTagsPost.data";

@Injectable()
export class TagsPostsService {
    constructor(@InjectModel(TagsPosts) private tagsPostsRepository: typeof TagsPosts){}

    async createAssociationTagsPosts(tagsPost:CreateTagsPost[]):Promise<object>{
        return await this.tagsPostsRepository.bulkCreate(tagsPost);
    }
}