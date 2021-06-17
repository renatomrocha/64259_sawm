import { ExchangeDocument, Exchange } from '../schemas/exchange.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Exchange.name) private exchangeModel: Model<ExchangeDocument>,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    let newUser;
    try {
      newUser = await createdUser.save();
    } catch (e) {
      throw 'Username already used by another account';
    }
    return newUser;
  }


  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async getProfile(id: string): Promise<User> {
    const user = (await this.userModel.findById(id)).execPopulate();
    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  }
}
