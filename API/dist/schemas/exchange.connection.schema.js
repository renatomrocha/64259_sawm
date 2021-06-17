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
exports.ExchangeConnectionSchema = exports.ExchangeConnection = void 0;
const exchange_schema_1 = require("./exchange.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("./user.schema");
let ExchangeConnection = class ExchangeConnection {
};
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], ExchangeConnection.prototype, "user", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exchange' }),
    __metadata("design:type", exchange_schema_1.Exchange)
], ExchangeConnection.prototype, "exchange", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ExchangeConnection.prototype, "apiKey", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ExchangeConnection.prototype, "secretKey", void 0);
ExchangeConnection = __decorate([
    mongoose_1.Schema()
], ExchangeConnection);
exports.ExchangeConnection = ExchangeConnection;
exports.ExchangeConnectionSchema = mongoose_1.SchemaFactory.createForClass(ExchangeConnection);
//# sourceMappingURL=exchange.connection.schema.js.map