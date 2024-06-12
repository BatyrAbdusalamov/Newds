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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const tag_model_1 = require("./models/tag.model");
let TagService = class TagService {
    constructor(tagRepository) {
        this.tagRepository = tagRepository;
    }
    async searchTags(userTags) {
        let newTags = [];
        let idTags = [];
        let data = null;
        try {
            data = await this.tagRepository.findAll();
        }
        catch (error) {
            return error;
        }
        let dataIdTag = [];
        let dataNameTag = [];
        data.forEach((element) => { dataNameTag.push(element.dataValues.nameTag); dataIdTag.push(element.dataValues.id); });
        userTags.forEach((element) => {
            if (dataNameTag.includes(element) === false) {
                newTags.push({ nameTag: element });
            }
            else {
                let tagIndexById = dataNameTag.findIndex((tag) => tag === element);
                idTags.push(dataIdTag[tagIndexById]);
            }
        });
        return { newTags, idTags };
    }
    async getIdTagsByPost(userTags) {
        try {
            console.log(9);
            const data = await this.searchTags(userTags);
            console.log(9, data);
            if (data.newTags.length !== 0) {
                console.log(9);
                const dataNewTags = await this.tagRepository.bulkCreate(data.newTags);
                console.log(dataNewTags);
                dataNewTags.forEach((element) => {
                    data.idTags.push(element.dataValues.id);
                });
                console.log(data);
                if (data !== undefined || null)
                    return data;
            }
        }
        catch (error) {
            return error;
        }
    }
};
exports.TagService = TagService;
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(tag_model_1.Tag)),
    __metadata("design:paramtypes", [Object])
], TagService);
//# sourceMappingURL=tag.service.js.map