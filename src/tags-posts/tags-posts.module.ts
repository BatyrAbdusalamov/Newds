import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TagsPosts } from "./tags-posts.model";
import { TagsPostsService } from "./tags-posts.service";

@Module({
    imports:[
        SequelizeModule.forFeature([TagsPosts])
      ],
      controllers: [],
      providers: [TagsPostsService],
      exports:[TagsPostsService]
})
export class TagsPostsModule{}