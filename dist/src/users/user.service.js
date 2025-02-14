"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const post_model_1 = require("../posts/models/post.model");
const tag_model_1 = require("../tags/models/tag.model");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUserPosts(id) {
        try {
            const user = await this.userRepository.findByPk(id, {
                order: [['createdAt', 'ASC']],
                attributes: ['id', 'login', 'firstName', 'lastName', 'photo'],
                include: [
                    { model: post_model_1.Post, include: [{ model: tag_model_1.Tag, attributes: ['id', 'nameTag'], through: { attributes: [] } }] },
                ]
            });
            if (user === null)
                return new common_1.HttpException(`This user does not exist!`, common_1.HttpStatus.CONFLICT);
            return user;
        }
        catch (error) {
            return new common_1.HttpException(error, 500);
        }
    }
    async getByLogin(login) {
        return await this.userRepository.findOne({ where: { login } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map