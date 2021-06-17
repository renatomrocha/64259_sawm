import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBasicAuth, ApiResponse} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBasicAuth()
  @Post('login')
  @ApiResponse({ status: 201, description: 'jwt' })
  async login(@Request() req) {
    try {
      const userObj = this.authService.processAuthorizationBasic(
        req.headers.authorization,
      );
      return await this.authService.generateAccessToken(userObj);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
