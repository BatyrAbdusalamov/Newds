import { CreateUserData } from "src/users/data/CreateUser.data";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt"
import { jwtConstants } from "./constants";
@Injectable()
export class AuthenticationService {
    constructor(@InjectModel(User) private userRepository: typeof User, private jwtService: JwtService) { }

    async register(registrationData: CreateUserData) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            let createdUser = await this.userRepository.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser['password'] = null;
            delete createdUser['password'];
            const payload = { sub: createdUser.id, username: createdUser.login };
            const jwt = await this.jwtService.signAsync(payload,jwtConstants);
            const addRefresh = await this.userRepository.update({refresh:jwt},{where:{id:createdUser.id}})
            createdUser.refresh = jwt;
            if(addRefresh[0]===0) throw new Error();
            return createdUser;
        } catch (error) { throw new HttpException(error, HttpStatus.BAD_REQUEST); }
    }

    async getAuthenticatedUser(data: CreateUserData) {
        try {
            const login = data.login;
            const user = await this.userRepository.findOne({ where: { login } });
            await this.verifyPassword(data.password, user.password);
            user.password = null;
            const payload = { sub: user.id, username: user.login };
            return {
                user:user,
                access_token: await this.jwtService.signAsync(payload),
            };
        } catch (error) {
            return new UnauthorizedException(error);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new Error('Invalid username or password');
        }
    }
}

