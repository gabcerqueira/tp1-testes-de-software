import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserInfoToken } from './dto/userInfo.dto';
import { DecodedToken } from './dto/decodedToken';
import { ErrorMessages } from '../shared/messages/ErrorMessages';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUserByToken', () => {
    it('should throw "Method not implemented."', async () => {
      await expect(authService.validateUserByToken(null)).rejects.toThrow(
        'Method not implemented.',
      );
    });
  });

  describe('refresh', () => {
    it('should refresh the token and return UserInfoToken', async () => {
      const decodedToken: DecodedToken = {
        sub: 'userId',
        email: 'test@example.com',
        iat: Date.now() / 1000,
        exp: (Date.now() + 3600) / 1000,
      };
      const user: User = {
        _id: 'userId',
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        active: true,
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(authService, 'assignToken').mockResolvedValue(
        Promise.resolve({
          token: 'newAccessToken',
          renewToken: 'newRenewToken',
        }),
      );

      const result = await authService.refresh(decodedToken);

      expect(result).toEqual({
        token: 'newAccessToken',
        renewToken: 'newRenewToken',
      });
    });

    it('should handle user not found and throw an error', async () => {
      const decodedToken: DecodedToken = {
        sub: 'userId',
        email: 'test@example.com',
        iat: Date.now() / 1000,
        exp: (Date.now() + 3600) / 1000,
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      await expect(authService.refresh(decodedToken)).rejects.toThrow(
        ErrorMessages.user.USER_DOES_NOT_EXIST,
      );
    });

    it('should handle errors during refresh and throw an error', async () => {
      const decodedToken: DecodedToken = {
        sub: 'userId',
        email: 'test@example.com',
        iat: Date.now() / 1000,
        exp: (Date.now() + 3600) / 1000,
      };

      jest
        .spyOn(userService, 'findByEmail')
        .mockRejectedValue(new Error('User retrieval error'));

      await expect(authService.refresh(decodedToken)).rejects.toThrow(
        'User retrieval error',
      );
    });
  });

  describe('login', () => {
    it('should return user and UserInfoToken after successful login', async () => {
      const user: User = {
        _id: 'userId',
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        active: true,
      };

      jest.spyOn(authService, 'assignToken').mockResolvedValue({
        token: 'accessToken',
        renewToken: 'renewToken',
      });

      const result = await authService.login(user);

      expect(result).toEqual({
        user,
        token: { token: 'accessToken', renewToken: 'renewToken' },
      });
    });
  });

  describe('validateUser', () => {
    it('should return sanitized user on successful validation', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      const user: User = {
        _id: 'userId',
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        active: true,
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('newAccessToken');

      const result = await authService.validateUser(email, password);

      const sanitizedUser: User = {
        _id: 'userId',
        email: 'test@example.com',
        name: 'Test User',
        active: true,
      };

      expect(result).toEqual(sanitizedUser);
    });

    it('should return null for inactive users', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      const user: User = {
        _id: 'userId',
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        active: false,
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);

      const result = await authService.validateUser(email, password);

      expect(result).toBeNull();
    });

    it('should return null for invalid passwords', async () => {
      const email = 'test@example.com';
      const password = 'wrongPassword';

      const user: User = {
        _id: 'userId',
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        active: true,
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);

      const result = await authService.validateUser(email, password);

      expect(result).toBeNull();
    });

    it('should return null for user retrieval errors', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      jest
        .spyOn(userService, 'findByEmail')
        .mockRejectedValue(new Error('User retrieval error'));

      const result = await authService.validateUser(email, password);

      expect(result).toBeNull();
    });
  });

  /*describe('assignToken', () => {
    it('should assign and return a UserInfoToken with tokens', () => {
      const user: User = {
        _id: 'userId',
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        active: true,
      };

      const payload = {
        sub: 'userId',
        email: 'test@example.com',
      };

      jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');
      jest.spyOn(jwtService, 'sign').mockReturnValue('renewToken');

      const result: UserInfoToken = authService.assignToken(user);

      expect(result).toEqual({
        token: 'accessToken',
        renewToken: 'renewToken',
      });
    });
  });*/
});
