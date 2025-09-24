import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import type { User } from '../users/users.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { request } from 'http';
import { PassportJWTAuthGuard } from './guards/passport-jwt.guard';

class CreateUserDTO {
  @ApiProperty({ description: 'username' })
  username: string;
  @ApiProperty({ description: 'password' })
  password: string;
}

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: CreateUserDTO })
  @UseGuards(PassportLocalGuard)
  login(@Request() request) {
    // return this.authService.authenticate(input);
    return this.authService.signIn(request.user);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(PassportJWTAuthGuard)
  getUserInfo(@Request() request) {
    return request.user;
  }
}
