import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from '@nestjs/common';
import { User } from "src/users/models/user.model";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})
export class AuthenticationModule { }