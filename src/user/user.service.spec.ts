import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './schema/user.schema';
import { SanitizedUser } from './dto/sanitizedUser';
import { ErrorMessages } from '../shared/messages/ErrorMessages';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should handle errors during user creation', async () => {
      const createUserDto: User = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        active: true,
      };
      jest
        .spyOn(userRepository, 'createUser')
        .mockRejectedValue(new Error('Failed to create user'));

      await expect(userService.create(createUserDto)).rejects.toThrow(Error);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const users: User[] = [
        {
          email: 'user1@example.com',
          name: 'User 1',
          password: 'password123',
          active: true,
          _id: 'user1Id',
        },
        {
          email: 'user2@example.com',
          name: 'User 2',
          password: 'password456',
          active: true,
          _id: 'user2Id',
        },
      ];

      jest.spyOn(userRepository, 'findAll').mockResolvedValue(users);

      const result = await userService.findAll();

      const expected: SanitizedUser[] = users.map(userService.sanitizeUser);
      expect(result).toEqual(expected);
    });

    it('should handle no users found', async () => {
      const emptyUserList: User[] = [];
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(emptyUserList);

      const result = await userService.findAll();

      expect(result).toEqual([]);
    });

    it('should handle errors during user retrieval', async () => {
      jest
        .spyOn(userRepository, 'findAll')
        .mockRejectedValue(new Error('Failed to retrieve users'));

      await expect(userService.findAll()).rejects.toThrow(Error);
    });
  });

  describe('findOne', () => {
    it('should find a user by ID', async () => {
      const userId = '123456789';
      const user: User = new User();
      jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

      const result = await userService.findOne(userId);

      expect(result).toEqual(userService.sanitizeUser(user));
    });

    it('should handle user not found by ID', async () => {
      const userId = 'invalidId';
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(userService.findOne(userId)).rejects.toThrow(
        ErrorMessages.user.USER_DOES_NOT_EXIST,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: User = {
        email: 'updated@example.com',
        name: 'Updated User',
        password: 'newPassword',
        active: true,
      };

      const updatedUser: User = {
        ...updateUserDto,
        _id: 'userId',
      };

      jest.spyOn(userRepository, 'update').mockResolvedValue(updatedUser);

      const result = await userService.update(updateUserDto);

      expect(result).toEqual(userService.sanitizeUser(updatedUser));
    });

    it('should handle user update failure', async () => {
      const updateUserDto: User = {
        email: 'updated@example.com',
        name: 'Updated User',
        password: 'newPassword',
        active: true,
      };

      jest.spyOn(userRepository, 'update').mockResolvedValue(null);

      await expect(userService.update(updateUserDto)).rejects.toThrow(
        ErrorMessages.user.ERROR_UPDATING_USER,
      );
    });

    it('should handle errors during user update', async () => {
      const updateUserDto: User = {
        email: 'updated@example.com',
        name: 'Updated User',
        password: 'newPassword',
        active: true,
      };

      jest
        .spyOn(userRepository, 'update')
        .mockRejectedValue(new Error('Failed to update user'));

      await expect(userService.update(updateUserDto)).rejects.toThrow(Error);
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const userId = '123456789';
      jest.spyOn(userRepository, 'remove').mockResolvedValue(true);

      const result = await userService.remove(userId);

      expect(result).toBe(true);
    });

    it('should handle user removal failure', async () => {
      const userId = 'invalidId';
      jest.spyOn(userRepository, 'remove').mockResolvedValue(false);

      const result = await userService.remove(userId);

      expect(result).toBe(false);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const userEmail = 'test@example.com';
      const user: User = new User();
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);

      const result = await userService.findByEmail(userEmail);

      expect(result).toEqual(user);
    });

    it('should handle user not found by email', async () => {
      const userEmail = 'nonexistent@example.com';
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      const result = await userService.findByEmail(userEmail);

      expect(result).toBeNull();
    });
  });
});
