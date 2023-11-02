import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
import { SanitizedUser } from './dto/sanitizedUser';
import { IuserService } from './interfaces/Iuser.service';

@Injectable()
export class UserService implements IuserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: User) {
    try {
      let user = new User();

      user.email = createUserDto.email;
      user.active = false;
      user.name = createUserDto.name;
      user.password = createUserDto.password;
      let createdUser = await this.userRepository.createUser(user);

      let updatedUser = await this.update(createdUser);

      if (!updatedUser) {
        throw new Error(ErrorMessages.user.ERROR_CREATING_USER);
      }

      let sanitizedUser = this.sanitizeUser(updatedUser);

      return sanitizedUser;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    let users: Array<User> = await this.userRepository.findAll();

    let sanitizedUsers: Array<SanitizedUser> = users.map((user) =>
      this.sanitizeUser(user),
    );

    return sanitizedUsers;
  }

  async findOne(id: string) {
    let user: User | null;

    user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(ErrorMessages.user.USER_DOES_NOT_EXIST);
    }

    let userDto = this.sanitizeUser(user);

    return userDto;
  }

  async update(updateUserDto: User) {
    try {
      let updatedUser = await this.userRepository.update(updateUserDto);

      if (!updatedUser) {
        throw new Error(ErrorMessages.user.ERROR_UPDATING_USER);
      }

      let sanitizedUserDto: SanitizedUser = this.sanitizeUser(updatedUser);

      return sanitizedUserDto;
    } catch (error) {
      return null;
    }
  }

  async remove(id: string): Promise<boolean> {
    return await this.userRepository.remove(id);
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    //Chamada da camada de rep

    let user: User | null;

    user = await this.userRepository.findByEmail(email);

    return user;
  }

  sanitizeUser(user: User): SanitizedUser {
    let sanitizedUser: SanitizedUser = {
      _id: user._id!,
      email: user.email,
      name: user.name,
      active: user.active,
    };

    return sanitizedUser;
  }
}
