import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.schema';
import { faker } from '@faker-js/faker';
import { UserRepository } from './user.repository';
import { SanitizedUser } from './dto/sanitizedUser';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { ErrorMessages } from '../shared/messages/ErrorMessages';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
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
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const DEFAULT_PASSWORD = '123456';
      const createUserDtoMock: SanitizedUser = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        active: false,
        _id: 'user1Id',
      };

      jest.spyOn(userService, 'create').mockResolvedValue(createUserDtoMock);

      const result = await controller.create(createUserDtoMock);

      expect(result.email).toEqual(createUserDtoMock.email);
    });

    it('should throw a BadRequestException if an error occurs in create', async () => {
      const createUserDtoMock: SanitizedUser = {
        name: '',
        email: '',
        active: false,
        _id: 'user1Id',
      };

      jest
        .spyOn(userService, 'create')
        .mockRejectedValue(new Error(ErrorMessages.user.USERS_NOT_FOUND));

      await expect(controller.create(createUserDtoMock)).rejects.toThrow(
        ErrorMessages.user.USERS_NOT_FOUND,
      );
    });
  });

  describe('find one', () => {
    it('should return one user', async () => {
      const id = '64f1fd4b1d5d8bc5650b85c3';
      const user: SanitizedUser = {
        email: 'user1@example.com',
        name: 'User 1',
        active: true,
        _id: '64f1fd4b1d5d8bc5650b85c3',
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(id);

      expect(result._id).toBe(id);
    });

    it('should throw a BadRequestException if an error occurs in findOne', async () => {
      const id = '64f1fd4b1d5d8bc5650b85c3';

      jest
        .spyOn(userService, 'findOne')
        .mockRejectedValue(new Error(ErrorMessages.user.USER_DOES_NOT_EXIST));

      await expect(controller.findOne(id)).rejects.toThrow(
        ErrorMessages.user.USER_DOES_NOT_EXIST,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = '64f1fd4b1d5d8bc5650b85c3';
      const updateUserDtoMock: SanitizedUser = {
        name: 'Updated Name',
        email: 'updated@example.com',
        active: true,
        _id: 'user1Id',
      };

      jest.spyOn(userService, 'update').mockResolvedValue(updateUserDtoMock);

      const result = await controller.update(id, updateUserDtoMock);

      expect(result.email).toEqual(updateUserDtoMock.email);
    });

    it('should throw a BadRequestException if an error occurs in update', async () => {
      const id = '64f1fd4b1d5d8bc5650b85c3';
      const updateUserDtoMock: SanitizedUser = {
        name: 'Updated Name',
        email: 'updated@example.com',
        active: true,
        _id: 'user1Id',
      };

      jest
        .spyOn(userService, 'update')
        .mockRejectedValue(new Error(ErrorMessages.user.ERROR_UPDATING_USER));

      await expect(controller.update(id, updateUserDtoMock)).rejects.toThrow(
        ErrorMessages.user.ERROR_UPDATING_USER,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = '64f1fd4b1d5d8bc5650b85c3';

      jest.spyOn(userService, 'remove').mockResolvedValue(true);

      const result = await controller.remove(id);

      expect(result).toBe(true);
    });

    it('should throw a BadRequestException if an error occurs in remove', async () => {
      const id = '64f1fd4b1d5d8bc5650b85c3';

      jest
        .spyOn(userService, 'remove')
        .mockRejectedValue(new Error(ErrorMessages.user.ERROR_DELETING_USER));

      await expect(controller.remove(id)).rejects.toThrow(
        ErrorMessages.user.ERROR_DELETING_USER,
      );
    });
  });
});
