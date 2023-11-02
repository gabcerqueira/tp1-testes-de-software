import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IauthController } from './interfaces/Iauth.controller';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/schema/user.schema';
import { DecodedToken } from './dto/decodedToken';

@ApiTags('Módulo de login')
@Controller('auth')
export class AuthController implements IauthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login no sistema por email e senha' })
  async login(@Req() req: any, @Body() loginDto: LoginDto) {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  @ApiOperation({ summary: 'Renovar o token' })
  async refresh(@Req() req: any) {
    return await this.authService.refresh(req.user);
  }
}
