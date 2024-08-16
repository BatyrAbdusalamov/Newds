import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from '@nestjs/common';
import { User } from "src/users/models/user.model";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { JwtModule, JwtService } from "@nestjs/jwt"
import { jwtConstants } from "./constants";
@Module({
    imports: [SequelizeModule.forFeature([User]),
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' }
      })],
    controllers: [AuthenticationController],
    providers: [AuthenticationService,JwtService],
    exports:[AuthenticationService]
})
export class AuthenticationModule { }