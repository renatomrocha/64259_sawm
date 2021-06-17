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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangesService = void 0;
const exchange_connection_schema_1 = require("../schemas/exchange.connection.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const exchange_schema_1 = require("../schemas/exchange.schema");
const mongoose_2 = require("mongoose");
const binance_api_service_1 = require("../binance_api/binance.api.service");
const user_schema_1 = require("../schemas/user.schema");
let ExchangesService = class ExchangesService {
    constructor(exchangeModel, userModel, exchangeConnectionModel, httpService, binanceApiService) {
        this.exchangeModel = exchangeModel;
        this.userModel = userModel;
        this.exchangeConnectionModel = exchangeConnectionModel;
        this.httpService = httpService;
        this.binanceApiService = binanceApiService;
    }
    async create(exchange) {
        const createdUser = new this.exchangeModel(exchange);
        return createdUser.save();
    }
    async createConnection(exchange, connectionInfo) {
        const exchangeConnectionObj = {
            exchange: exchange,
            apiKey: connectionInfo.apiKey,
            secretKey: connectionInfo.secretKey,
        };
        const createdConnection = new this.exchangeConnectionModel(exchangeConnectionObj);
        return createdConnection.save();
    }
    async findAll() {
        return this.exchangeModel.find().exec();
    }
    async findById(id) {
        return this.exchangeModel.findById(id);
    }
    async getAccountWalletForExchange(exchangeConnectionId) {
        return this.exchangeConnectionModel
            .findById(exchangeConnectionId)
            .populate('exchange')
            .then((exchangeConnection) => {
            return this.binanceApiService.getSpotAccountBalance(exchangeConnection);
        }, (err) => console.log('Apanhei erro: ', err));
    }
    async findConnectionsForUser(id) {
        return this.userModel
            .findById(id)
            .populate({
            path: 'exchangeConnections',
            populate: {
                path: 'exchange',
                model: 'Exchange',
            },
        })
            .exec();
    }
    async connectUserToExchange(userId, exchangeConnectionInfo) {
        console.log('Recebi exchangeinfo: ', exchangeConnectionInfo);
        this.exchangeModel
            .findById(exchangeConnectionInfo.exchange)
            .then((exchange) => {
            console.log('Encontrei exchange: ', exchange);
            try {
                this.userModel.findById(userId).then(async (user) => {
                    try {
                        const newConnection = await this.createConnection(exchange, exchangeConnectionInfo);
                        user.exchangeConnections.push(newConnection);
                        user.save();
                        return user;
                    }
                    catch (err) {
                        console.log('Erro: ', err);
                    }
                });
            }
            catch (err) {
                throw new Error('Erro ao conectar utilizador com exchange');
            }
        });
    }
    async removeExchange(userId, exchangeId) {
        return this.userModel.findByIdAndUpdate(userId, { $pull: { exchangeConnections: exchangeId } }, { new: true });
    }
};
ExchangesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(exchange_schema_1.Exchange.name)),
    __param(1, mongoose_1.InjectModel(user_schema_1.User.name)),
    __param(2, mongoose_1.InjectModel(exchange_connection_schema_1.ExchangeConnection.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        common_1.HttpService,
        binance_api_service_1.BinanceApiService])
], ExchangesService);
exports.ExchangesService = ExchangesService;
//# sourceMappingURL=exchanges.service.js.map