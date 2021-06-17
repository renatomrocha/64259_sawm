import { Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<typeof UnauthorizedException | {
        id: any;
        username: any;
    }>;
}
export {};
