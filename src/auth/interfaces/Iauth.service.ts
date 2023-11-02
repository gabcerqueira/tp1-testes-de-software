import { User } from 'src/user/schema/user.schema';
import { LoginDto } from '../dto/login.dto';
import { UserInfoToken } from '../dto/userInfo.dto';
import { DecodedToken } from '../dto/decodedToken';

export interface IauthService {
  refresh(decodedToken: DecodedToken): Promise<UserInfoToken>;

  login(user: User): Promise<{ user: User; token: UserInfoToken }>;

  validateUserByToken(decodedToken: DecodedToken): Promise<boolean>;
}
