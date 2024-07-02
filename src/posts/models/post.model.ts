import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { TagsPosts } from "src/tags-posts/models/tags-posts.model";
import { Tag } from "src/tags/models/tag.model";
import { User } from "src/users/models/user.model";

interface PostCreation {
    id: number;
    content: string;
    topic: string;
    idPostUser: number;
    idTags: number;
    picture: string;
}


@Table({tableName:'post'})
export class Post extends Model <Post, PostCreation>{
    @Column({type:DataType.INTEGER, unique:true,autoIncrement:true, allowNull: false, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING})
    content: string;

    @Column({type:DataType.STRING})
    topic: string; 
    
    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    idPostUser: number;

    @Column({type:DataType.STRING})
    picture: string;

    @BelongsToMany(()=>Tag,()=>TagsPosts)
    tags:Tag[];
}