import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from 'src/shared/strategies/login/local.strategy';
import { JwtStrategy } from 'src/shared/strategies/login/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import ConfigModule first
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
})
export class AuthModule {}
