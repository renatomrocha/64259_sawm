import { Exchange } from './exchange.schema';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
export declare type ExchangeConnectionDocument = ExchangeConnection & mongoose.Document;
export declare class ExchangeConnection {
    user: User;
    exchange: Exchange;
    apiKey: string;
    secretKey: string;
}
export declare const ExchangeConnectionSchema: mongoose.Schema<mongoose.Document<ExchangeConnection, {}>, mongoose.Model<any, any>, undefined>;
