"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceApiService = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const crypto_1 = require("crypto");
let BinanceApiService = class BinanceApiService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getSpotAccountBalance(exchangeConnectionInfo) {
        const endpoint = 'account';
        const query = '';
        return this.buildRequest(exchangeConnectionInfo, query, endpoint);
    }
    async buildRequest(exchangeConnectionInfo, queryString, endpointExtension) {
        const headersRequest = {
            'X-MBX-APIKEY': exchangeConnectionInfo.apiKey,
        };
        const timestamp = Date.now();
        const signature = this.signature('timestamp=' + timestamp + queryString, exchangeConnectionInfo.secretKey);
        const request = exchangeConnectionInfo.exchange.apiUrl +
            '/api/v3/' +
            endpointExtension +
            '?timestamp=' +
            timestamp +
            queryString +
            '&signature=' +
            signature;
        console.log('API key: ', exchangeConnectionInfo.apiKey);
        console.log('Secret key: ', exchangeConnectionInfo.secretKey);
        console.log('Request: ', request);
        return this.httpService.get(request, { headers: headersRequest }).pipe(operators_1.tap((t) => console.log('Received: ', Object.keys(t))), operators_1.map((r) => r.data));
    }
    signature(queryString, apiSecret) {
        return crypto_1.default
            .createHmac('sha256', apiSecret)
            .update(queryString)
            .digest('hex');
    }
};
BinanceApiService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], BinanceApiService);
exports.BinanceApiService = BinanceApiService;
//# sourceMappingURL=binance.api.service.js.map