import { ExchangesService } from './exchanges.service';
import { Exchange } from 'src/schemas/exchange.schema';
import { ExchangeConnectionDto } from '../dto/exchange-connection-info.dto';
export declare class ExchangesController {
    private exchangesService;
    constructor(exchangesService: ExchangesService);
    listExchanges(): Promise<Exchange[]>;
    connect(req: any, exchangeConnectionInfo: ExchangeConnectionDto): Promise<void>;
    getWallet(connectionId: string): Promise<any>;
    listConnectionsForUser(req: any): Promise<import("../schemas/user.schema").UserDocument>;
    removeExchange(req: any, connectionId: string): Promise<import("../schemas/user.schema").UserDocument>;
}
