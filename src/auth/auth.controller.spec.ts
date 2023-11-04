import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/schema/user.schema';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
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
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return a token on successful login', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123'
      };

      const user: User = {
        _id: 123456,
        name: 'Test',
        active: true,
        email: 'test@example.com',
        password: 'password123'
      };

      const mockToken = { user: User,token: 'mocked-access-token'}

      jest.spyOn(authService, 'login').mockImplementation(async () => ({
        access_token: mockToken,
      }));

      const result = await authController.login({}, loginDto);

      expect(result).toEqual({ access_token: mockToken });
    });

  });

  describe('refresh', () => {
    it('should return a new token on successful refresh', async () => {
      const user: User = {
        _id: 123456,
        name: 'Test',
        active: true,
        email: 'test@example.com',
        password: 'password123'
      };

      const mockToken = { user: User,token: 'mocked-access-token'}

      jest.spyOn(authService, 'refresh').mockImplementation(async () => ({
        access_token: mockToken,
      }));

      const result = await authController.refresh({ user });

      expect(result).toEqual({ access_token: mockToken });
    });
  });
});
