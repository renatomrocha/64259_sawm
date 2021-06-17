import { Document } from 'mongoose';
export declare type ExchangeDocument = Exchange & Document;
export declare class Exchange {
    name: string;
    apiUrl: string;
    logoUrl: string;
}
export declare const ExchangeSchema: import("mongoose").Schema<Document<Exchange, {}>, import("mongoose").Model<any, any>, undefined>;
