import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IuserController } from './interfaces/Iuser.controller';
import { SanitizedUser } from './dto/sanitizedUser';
import { ErrorMessages } from '../shared/messages/ErrorMessages';

@ApiTags('Módulo de usuários')
@Controller('user')
export class UserController implements IuserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  create(@Body() createUserDto: User) {
    try {
      return this.userService.create(createUserDto);
    } catch {
      throw new BadRequestException(ErrorMessages.user.ERROR_CREATING_USER);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Recuperar todos os usuários' })
  findAll() {
    try {
      return this.userService.findAll();
    } catch {
      throw new BadRequestException(ErrorMessages.user.USERS_NOT_FOUND);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar usuário' })
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(id);
    } catch {
      throw new BadRequestException(ErrorMessages.user.USER_DOES_NOT_EXIST);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar usuário' })
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    try {
      return this.userService.update(updateUserDto);
    } catch {
      throw new BadRequestException(ErrorMessages.user.ERROR_UPDATING_USER);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário' })
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(id);
    } catch {
      throw new BadRequestException(ErrorMessages.user.ERROR_DELETING_USER);
    }
  }
}
