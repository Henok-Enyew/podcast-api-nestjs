import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import type { User } from '../users/users.service';

class CreateUserDTO {
  @ApiProperty({ description: 'username' })
  username: string;
  @ApiProperty({ description: 'password' })
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: CreateUserDTO })
  login(@Body() input: CreateUserDTO) {
    return this.authService.authenticate(input);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiBearerAuth()
  getUserInfo(@Request() request: { user: User }): User {
    return request.user;
  }
}
