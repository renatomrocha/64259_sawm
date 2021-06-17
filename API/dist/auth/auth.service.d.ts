import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    generateAccessToken(user: any): Promise<typeof UnauthorizedException | {
        expires_at: Date;
        token: string;
    }>;
    processAuthorizationBasic(encodedInfo: any): {
        username: string;
        password: string;
    };
}
