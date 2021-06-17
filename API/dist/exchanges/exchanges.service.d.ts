import { ExchangeConnection, ExchangeConnectionDocument } from '../schemas/exchange.connection.schema';
import { ExchangeDocument } from '../schemas/exchange.schema';
import { HttpService } from '@nestjs/common';
import { Exchange } from 'src/schemas/exchange.schema';
import { Model } from 'mongoose';
import { BinanceApiService } from '../binance_api/binance.api.service';
import { UserDocument } from '../schemas/user.schema';
export declare class ExchangesService {
    private exchangeModel;
    private userModel;
    private exchangeConnectionModel;
    private httpService;
    private binanceApiService;
    constructor(exchangeModel: Model<ExchangeDocument>, userModel: Model<UserDocument>, exchangeConnectionModel: Model<ExchangeConnectionDocument>, httpService: HttpService, binanceApiService: BinanceApiService);
    create(exchange: any): Promise<Exchange>;
    createConnection(exchange: any, connectionInfo: any): Promise<ExchangeConnection>;
    findAll(): Promise<Exchange[]>;
    findById(id: any): Promise<Exchange>;
    getAccountWalletForExchange(exchangeConnectionId: any): Promise<void | import("rxjs").Observable<any>>;
    findConnectionsForUser(id: string): Promise<UserDocument>;
    connectUserToExchange(userId: string, exchangeConnectionInfo: any): Promise<void>;
    removeExchange(userId: string, exchangeId: string): Promise<UserDocument>;
}
