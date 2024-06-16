import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './models/tag.model';
import { CreateTagData } from 'src/tags/data/CreateTag.data';

@Injectable()
export class TagService {
    constructor(@InjectModel(Tag) private tagRepository: typeof Tag) { }

    async searchTags(userTags: Array<string>): Promise<{
        newTags: object[];
        idTags: number[];
    }> {
        let newTags: Array<object> = [];
        let idTags: Array<number> = [];
        let data = null;
        try {
            data = await this.tagRepository.findAll();
        } catch (error) {
            return error;
        }

        let dataIdTag: Array<number> = [];
        let dataNameTag: Array<string> = [];
        data.forEach((element) => { dataNameTag.push(element.dataValues.nameTag); dataIdTag.push(element.dataValues.id); });
        userTags.forEach((element: string) => {
            if (dataNameTag.includes(element) === false) {
                newTags.push({ nameTag: element })
            } else {
                let tagIndexById = dataNameTag.findIndex((tag) => tag === element);
                idTags.push(dataIdTag[tagIndexById])
            }
        });
        return { newTags, idTags }
    }

    async getIdTagsByPost(userTags: Array<string>): Promise<{
        newTags: object[];
        idTags: number[];
    }> {
        try {
            console.log(9)
            const data = await this.searchTags(userTags)
            if (data.newTags.length !== 0) {
                const dataNewTags = await this.tagRepository.bulkCreate(data.newTags)
                dataNewTags.forEach((element) => {
                    data.idTags.push(element.dataValues.id);
                })
                if (data) return data;
            }
        } catch (error) {

            return error;
        }
    }
}
