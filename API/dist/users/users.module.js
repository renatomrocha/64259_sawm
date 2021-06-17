"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const binance_api_module_1 = require("../binance_api/binance.api.module");
const exchanges_service_1 = require("../exchanges/exchanges.service");
const exchange_schema_1 = require("../schemas/exchange.schema");
const mongoose_1 = require("@nestjs/mongoose");
const users_controller_1 = require("./users.controller");
const user_schema_1 = require("../schemas/user.schema");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const exchanges_module_1 = require("../exchanges/exchanges.module");
const exchange_connection_schema_1 = require("../schemas/exchange.connection.schema");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [
            exchanges_module_1.ExchangesModule,
            common_1.HttpModule,
            binance_api_module_1.BinanceApiModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: exchange_schema_1.Exchange.name, schema: exchange_schema_1.ExchangeSchema },
                { name: exchange_connection_schema_1.ExchangeConnection.name, schema: exchange_connection_schema_1.ExchangeConnectionSchema },
            ]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, exchanges_service_1.ExchangesService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map