"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_controller_1 = require("./post.controller");
const sequelize_1 = require("@nestjs/sequelize");
const post_model_1 = require("./models/post.model");
const tag_model_1 = require("../tags/models/tag.model");
const tags_posts_model_1 = require("../tags-posts/models/tags-posts.model");
const tag_module_1 = require("../tags/tag.module");
const tags_posts_module_1 = require("../tags-posts/tags-posts.module");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([post_model_1.Post, tag_model_1.Tag, tags_posts_model_1.TagsPosts]),
            tag_module_1.TagModule, tags_posts_module_1.TagsPostsModule,
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService],
    })
], PostModule);
//# sourceMappingURL=post.module.js.map