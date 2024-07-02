import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/models/post.model";
import { Tag } from "src/tags/models/tag.model";
import { CreateTagsPost } from "../data/CreateTagsPost.data";


@Table({tableName:'tags_posts'})
export class TagsPosts extends Model <TagsPosts, CreateTagsPost>{
    @Column({type:DataType.INTEGER, unique:true,autoIncrement:true, allowNull: false, primaryKey: true})
    id: number;

    @ForeignKey(()=>Post)
    @Column({type:DataType.INTEGER,allowNull:false})
    idPosts: number;

    @ForeignKey(()=>Tag)
    @Column({type:DataType.INTEGER,allowNull:false})
    idTags: number;
}