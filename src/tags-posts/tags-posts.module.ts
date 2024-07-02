import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TagsPosts } from "./models/tags-posts.model";
import { TagsPostsService } from "./tags-posts.service";
import { Post } from "src/posts/models/post.model";
import { Tag } from "src/tags/models/tag.model";

@Module({
    imports:[
        SequelizeModule.forFeature([Tag,Post,TagsPosts])
      ],
      controllers: [],
      providers: [TagsPostsService],
      exports:[TagsPostsService]
})
export class TagsPostsModule{}