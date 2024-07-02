import { Model } from "sequelize-typescript";
import { CreateTagsPost } from "../data/CreateTagsPost.data";
export declare class TagsPosts extends Model<TagsPosts, CreateTagsPost> {
    id: number;
    idPosts: number;
    idTags: number;
}
