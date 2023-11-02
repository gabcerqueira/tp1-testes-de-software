import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schema/user.schema';
import { IauthService } from './interfaces/Iauth.service';
import { LoginDto } from './dto/login.dto';
import { UserInfoToken } from './dto/userInfo.dto';
import { DecodedToken } from './dto/decodedToken';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';

@Injectable()
export class AuthService implements IauthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validateUserByToken(decodedToken: DecodedToken): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async refresh(decodedToken: DecodedToken): Promise<UserInfoToken> {
    try {
      const user = await this.userService.findByEmail(decodedToken.email);

      if (!user) {
        throw new Error(ErrorMessages.user.USER_DOES_NOT_EXIST);
      }

      let userInfoToken = await this.assignToken(user);

      return userInfoToken;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user: User) {
    const userInfoToken = await this.assignToken(user);

    return { user, token: userInfoToken };
  }
  async validateUser(email: string, password: string) {
    try {
      let user: User | any;

      user = await this.userService.findByEmail(email);

      console.log('USER : ', user);

      //if (!user.active) return null;

      const validPassword = compareSync(password, user.password);
      if (!validPassword) return null;

      delete user.createdAt;
      delete user.updatedAt;
      delete user.password;

      let sanitizedUser = new User();
      sanitizedUser._id = user._id;
      sanitizedUser.active = user.active;
      sanitizedUser.email = user.email;
      sanitizedUser.name = user.name;

      console.log('user : ', sanitizedUser);

      return sanitizedUser;
    } catch (error) {
      return null;
    }
  }

  async assignToken(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
    };
    const userInfoToken = new UserInfoToken();
    console.log('PAYLOAD : ', payload);
    //Assinar o token
    Object.assign(userInfoToken, {
      token: this.jwtService.sign(payload),
      renewToken: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH,
      }),
    });

    return userInfoToken;
  }
}
