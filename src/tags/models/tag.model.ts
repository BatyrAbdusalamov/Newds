import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/models/post.model";
import { TagsPosts } from "src/tags-posts/models/tags-posts.model";

interface TagCreation {
    id: number;
    nameTag: string;
}



@Table({tableName:'tag'})
export class Tag extends Model <Tag, TagCreation>{
    @Column({type:DataType.INTEGER, unique:true,autoIncrement:true, allowNull: false, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING})
    nameTag: string;
}