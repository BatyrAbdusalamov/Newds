import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';


@Module({  
  imports:[
    SequelizeModule.forFeature([User]),
    TokenModule
  ],
  controllers: [UserController],
  providers: [UserService],

})
export class UserModule {}