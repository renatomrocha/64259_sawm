import { UserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<import("../schemas/user.schema").User>;
    createUser(userDto: UserDto): Promise<string>;
}
