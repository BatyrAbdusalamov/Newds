import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserData } from 'src/users/data/CreateUser.data';
import { Post } from 'src/posts/models/post.model';
import { Tag } from 'src/tags/models/tag.model';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User, private tokenService:TokenService) { }

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

    async addNewUser(registrationData: CreateUserData): Promise< {user:CreateUserData,accessToken:string,refreshToken:string} | HttpException> {
        try {
            const findUserOrLogin = (await this.userRepository.findAll({ where: { login: registrationData.login } })).length
            if (findUserOrLogin !== 0) return new HttpException(`This Login( ${registrationData.login} ) already using!`, HttpStatus.CONFLICT);
            const hashedPassword = await bcrypt.hash(registrationData.password, 10);
            let createdUser = await this.userRepository.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser['password'] = null;
            const jwtTokens = await this.tokenService.createJwtTokens(createdUser)
            console.log(jwtTokens)
            return {user:createdUser,...jwtTokens}
        } catch (error) { return new HttpException(error, 500); }
    }

    async getByLogin(login: string): Promise<User | HttpException> {
        return await this.userRepository.findOne({ where: { login } })
    }
}
