import { Request } from 'express';
import { UserInfoToken } from '../dto/userInfo.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from 'src/user/schema/user.schema';

export interface IauthController {
  login(
    req: Request,
    body: LoginDto,
  ): Promise<{ user: User; token: UserInfoToken }>;

  refresh(req: Request): Promise<UserInfoToken>;
}
