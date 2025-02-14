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
exports.AuthenticationService = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const user_model_1 = require("../users/models/user.model");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthenticationService = class AuthenticationService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(registrationData) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            let createdUser = await this.userRepository.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser['password'] = null;
            delete createdUser['password'];
            const tokens = await this.createJwtTokens(createdUser);
            return [createdUser, tokens];
        }
        catch (error) {
            return new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAuthenticatedUser(data) {
        try {
            const login = data.login;
            const user = await this.userRepository.findOne({ where: { login } });
            await this.verifyPassword(data.password, user.password);
            user.password = null;
            const tokens = await this.createJwtTokens(data);
            return [user, tokens];
        }
        catch (error) {
            return new common_1.UnauthorizedException(error);
        }
    }
    async verifyPassword(plainTextPassword, hashedPassword) {
        const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
        if (!isPasswordMatching) {
            throw new Error('Invalid username or password');
        }
    }
    async createJwtTokens(user) {
        const payload = { sub: user.id, username: user.login };
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN'),
            expiresIn: `30d`
        });
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN'),
            expiresIn: `30m`
        });
        return { refreshToken, accessToken };
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService, config_1.ConfigService])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map