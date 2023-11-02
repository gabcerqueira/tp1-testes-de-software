import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IuserController } from './interfaces/Iuser.controller';
import { SanitizedUser } from './dto/sanitizedUser';

@ApiTags('Módulo de usuários')
@Controller('user')
export class UserController implements IuserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  create(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Recuperar todos os usuários' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar usuário' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar usuário' })
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
