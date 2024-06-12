import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { Tag } from 'src/tags/models/tag.model';
import { TagsPosts } from 'src/tags-posts/tags-posts.model';
import { TagModule } from 'src/tags/tag.module';
import { TagsPostsModule } from 'src/tags-posts/tags-posts.module';

@Module({  
  imports:[
    SequelizeModule.forFeature([Post,Tag,TagsPosts]),
    TagModule,TagsPostsModule,
  ],
  controllers: [PostController],
  providers: [PostService],

})
export class PostModule {}