import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { DecodedToken } from './dto/decodedToken';
import { ErrorMessages } from '../shared/messages/ErrorMessages';
import { UserRepository } from '../user/user.repository';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/schema/user.schema';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            validateUserByToken: jest.fn(),
            refresh: jest.fn(),
            login: jest.fn(),
            validateUser: jest.fn(),
            assignToken: jest.fn(),
          },
        },
        UserService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findByEmail: jest.fn(),
          },
        },

        JwtService,
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
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
});
