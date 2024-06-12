import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './models/tag.model';
import { Post } from 'src/posts/models/post.model';
import { TagsPosts } from 'src/tags-posts/tags-posts.model';

@Module({  
  imports:[
    SequelizeModule.forFeature([Tag,Post,TagsPosts])
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]

})
export class TagModule {}