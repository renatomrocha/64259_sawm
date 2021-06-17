import { HttpService } from '@nestjs/common';
export declare class BinanceApiService {
    private httpService;
    constructor(httpService: HttpService);
    getSpotAccountBalance(exchangeConnectionInfo: any): Promise<import("rxjs").Observable<any>>;
    private buildRequest;
    private signature;
}
