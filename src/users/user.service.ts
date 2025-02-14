import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserData } from 'src/users/data/CreateUser.data';
import { Post } from 'src/posts/models/post.model';
import { Tag } from 'src/tags/models/tag.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User,) { }

    async getUserPosts(id: number): Promise<User | HttpException> {
        try {
            const user: User | null = await this.userRepository.findByPk(id, {
                order: [['createdAt', 'ASC']],
                attributes: ['id', 'login', 'firstName', 'lastName', 'photo'],
                include: [
                    { model: Post, include: [{ model: Tag, attributes: ['id', 'nameTag'], through: { attributes: [] } }] },
                ]
            })
            if (user === null) return new HttpException(`This user does not exist!`, HttpStatus.CONFLICT);
            return user;
        } catch (error) { return new HttpException(error, 500); }
    }


    async getByLogin(login: string): Promise<User | HttpException> {
        return await this.userRepository.findOne({ where: { login } })
    }
}
