import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/models/user.model';
import { Token } from './models/token.model';
import { jwtConstants } from 'src/authentication/constants';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Token]),JwtModule,ConfigModule],
  providers: [TokenService],
  controllers: [TokenController],
  exports:[TokenService]
})
export class TokenModule {}
