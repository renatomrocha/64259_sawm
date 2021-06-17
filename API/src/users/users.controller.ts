import { UserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'User not found'})
  async getProfile(@Request() req) {
    try {
      const user = await this.usersService.getProfile(req.user.id);
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @Post('register')
  @ApiResponse({ status: 200, description: 'User successfully registered' })
  @ApiResponse({
    status: 400,
    description: 'Username already used by another account',
  })
  async createUser(@Body() userDto: UserDto): Promise<string> {
    let user;
    try {
      user = await this.usersService.create(userDto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    return 'User successfully registered';
  }
}
