import { ExchangeConnection } from './exchange.connection.schema';
import * as mongoose from 'mongoose';
export declare type UserDocument = User & mongoose.Document;
export declare class User {
    name: string;
    username: string;
    email: string;
    password: string;
    exchangeConnections: ExchangeConnection[];
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, {}>, mongoose.Model<any, any>, undefined>;
