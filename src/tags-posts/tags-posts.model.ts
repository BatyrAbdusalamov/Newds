import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/models/post.model";
import { Tag } from "src/tags/models/tag.model";

interface TagsPostsCreation {
    idPosts:number,
    idTags:number, 
}


@Table({tableName:'tags_posts',createdAt:false,updatedAt:false})
export class TagsPosts extends Model <TagsPosts, TagsPostsCreation>{
    @Column({type:DataType.INTEGER, unique:true,autoIncrement:true, allowNull: false, primaryKey: true})
    id: number;

    @ForeignKey(()=>Post)
    @Column({type:DataType.INTEGER})
    idPosts: number;

    @ForeignKey(()=>Tag)
    @Column({type:DataType.INTEGER})
    idTags: number;
}