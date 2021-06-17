"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangesModule = void 0;
const binance_api_service_1 = require("../binance_api/binance.api.service");
const binance_api_module_1 = require("../binance_api/binance.api.module");
const exchange_connection_schema_1 = require("../schemas/exchange.connection.schema");
const common_1 = require("@nestjs/common");
const exchanges_service_1 = require("./exchanges.service");
const exchanges_controller_1 = require("./exchanges.controller");
const mongoose_1 = require("@nestjs/mongoose");
const exchange_schema_1 = require("../schemas/exchange.schema");
const user_schema_1 = require("../schemas/user.schema");
let ExchangesModule = class ExchangesModule {
};
ExchangesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: exchange_schema_1.Exchange.name, schema: exchange_schema_1.ExchangeSchema },
                { name: exchange_connection_schema_1.ExchangeConnection.name, schema: exchange_connection_schema_1.ExchangeConnectionSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            common_1.HttpModule,
            binance_api_module_1.BinanceApiModule,
        ],
        providers: [exchanges_service_1.ExchangesService, binance_api_service_1.BinanceApiService],
        controllers: [exchanges_controller_1.ExchangesController],
    })
], ExchangesModule);
exports.ExchangesModule = ExchangesModule;
//# sourceMappingURL=exchanges.module.js.map