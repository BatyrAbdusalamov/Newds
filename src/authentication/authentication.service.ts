import { CreateUserData } from "src/users/data/CreateUser.data";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt"
import { jwtConstants } from "./constants";
import { ConfigService } from "@nestjs/config";

interface Tokens {
    accessToken: string,
    refreshToken: string,
}
@Injectable()
export class AuthenticationService {
    constructor(@InjectModel(User) private userRepository: typeof User, private jwtService: JwtService, private configService: ConfigService) { }

    async register(registrationData: CreateUserData): Promise<HttpException | [CreateUserData,Tokens]> {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            let createdUser = await this.userRepository.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser['password'] = null;
            delete createdUser['password'];
            const tokens = await this.createJwtTokens(createdUser)
            return [createdUser, tokens];
        } catch (error) { return new HttpException(error, HttpStatus.BAD_REQUEST); }
    }

    async getAuthenticatedUser(data: CreateUserData): Promise<UnauthorizedException | [CreateUserData,Tokens]> {
        try {
            const login = data.login;
            const user = await this.userRepository.findOne({ where: { login } });
            await this.verifyPassword(data.password, user.password);
            user.password = null;
            const tokens = await this.createJwtTokens(data)
            return [user, tokens]
        } catch (error) {
            return new UnauthorizedException(error);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string){
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new Error('Invalid username or password');
        }
    }

    private async createJwtTokens(user: CreateUserData): Promise<Tokens>  {
        const payload = { sub: user.id, username: user.login };
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN'),
            expiresIn: `30d`
        });
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN'),
            expiresIn: `30m`
        });

        return { refreshToken, accessToken }
    }
}

