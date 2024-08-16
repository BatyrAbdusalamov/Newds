import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserData } from 'src/users/data/CreateUser.data';
import { Token } from './models/token.model'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class TokenService {
    constructor(@InjectModel(Token) private tokenRepository: typeof Token, private configService: ConfigService, private jwtService: JwtService) { }
    async createJwtTokens(user: CreateUserData) {
        const payload = { sub: user.id, username: user.login };
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN'),
            expiresIn: `30d`
        });
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN'),
            expiresIn: `30m`
        });
        const createToken = await this.tokenRepository.create({ refresh: refreshToken, userId: user.id });
        if (typeof createToken.id !== "number") throw Error("Token don`t was be created")
        return { refreshToken, accessToken }
    }
}
