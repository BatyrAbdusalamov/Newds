import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserData } from 'src/users/data/CreateUser.data';
import { Post } from 'src/posts/models/post.model';
import { Tag } from 'src/tags/models/tag.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User) { }

    async getUser(id:number){
        return await this.userRepository.findByPk(id,{ order: [['createdAt', 'ASC']],
            include: [
              { model: Post},
            ],},)
    }

    async addNewUser(data: CreateUserData){
        return await this.userRepository.create(data);
    }

    async getByLogin(login:string){
        return await this.userRepository.findOne({where:{login}})
    }
}
