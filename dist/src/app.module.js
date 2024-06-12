"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_module_1 = require("./users/user.module");
const post_module_1 = require("./posts/post.module");
const config_1 = require("@nestjs/config");
const user_model_1 = require("./users/models/user.model");
const post_model_1 = require("./posts/models/post.model");
const tag_model_1 = require("./tags/models/tag.model");
const authentication_module_1 = require("./authentication/authentication.module");
const tags_posts_module_1 = require("./tags-posts/tags-posts.module");
const tags_posts_model_1 = require("./tags-posts/tags-posts.model");
const tag_module_1 = require("./tags/tag.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    dialect: configService.get('DB_DIALECT'),
                    host: configService.get('DB_HOST'),
                    autoLoadModels: true,
                    synchronize: true,
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    port: Number(configService.get('DB_PORT')),
                    database: configService.get('DB_NAME'),
                    models: [user_model_1.User, post_model_1.Post, tag_model_1.Tag, tags_posts_model_1.TagsPosts]
                }),
                inject: [config_1.ConfigService]
            }),
            tags_posts_module_1.TagsPostsModule,
            tag_module_1.TagModule,
            user_module_1.UserModule,
            post_module_1.PostModule,
            authentication_module_1.AuthenticationModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map