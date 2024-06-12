import { Model } from "sequelize-typescript";
interface TagsPostsCreation {
    idPosts: number;
    idTags: number;
}
export declare class TagsPosts extends Model<TagsPosts, TagsPostsCreation> {
    id: number;
    idPosts: number;
    idTags: number;
}
export {};
