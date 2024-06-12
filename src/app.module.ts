import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/models/user.model';
import { Post } from './posts/models/post.model';
import { Tag } from './tags/models/tag.model';
import { AuthenticationModule } from './authentication/authentication.module';
import { TagsPostsModule } from './tags-posts/tags-posts.module';
import { TagsPosts } from './tags-posts/tags-posts.model';
import { TagModule } from './tags/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DB_DIALECT'),
        host: configService.get('DB_HOST'),
        autoLoadModels:true,
        synchronize:true,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        port: Number(configService.get('DB_PORT')),
        database: configService.get('DB_NAME'),
        models: [User,Post,Tag,TagsPosts]
      }),
      inject: [ConfigService]
    }),
    TagsPostsModule,
    TagModule,
    UserModule,
    PostModule,
    AuthenticationModule
  ]})
export class AppModule {}