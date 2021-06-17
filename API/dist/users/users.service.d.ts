import { ExchangeDocument } from '../schemas/exchange.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from '../dto/create-user.dto';
export declare class UsersService {
    private userModel;
    private exchangeModel;
    constructor(userModel: Model<UserDocument>, exchangeModel: Model<ExchangeDocument>);
    create(userDto: UserDto): Promise<User>;
    findOne(username: string): Promise<User>;
    getProfile(id: string): Promise<User>;
}
