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
exports.ExchangesController = void 0;
const exchanges_service_1 = require("./exchanges.service");
const common_1 = require("@nestjs/common");
const exchange_schema_1 = require("../schemas/exchange.schema");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const exchange_connection_info_dto_1 = require("../dto/exchange-connection-info.dto");
const swagger_1 = require("@nestjs/swagger");
let ExchangesController = class ExchangesController {
    constructor(exchangesService) {
        this.exchangesService = exchangesService;
    }
    async listExchanges() {
        return this.exchangesService.findAll();
    }
    async connect(req, exchangeConnectionInfo) {
        return this.exchangesService
            .connectUserToExchange(req.user.id, exchangeConnectionInfo)
            .then(() => console.log('Utilizador associado com sucesso'), () => console.log('Erro ao conectar utilizador com exchange'));
    }
    async getWallet(connectionId) {
        return this.exchangesService.getAccountWalletForExchange(connectionId);
    }
    async listConnectionsForUser(req) {
        return this.exchangesService.findConnectionsForUser(req.user.id);
    }
    async removeExchange(req, connectionId) {
        return this.exchangesService.removeExchange(req.user.id, connectionId);
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: 200, description: 'Exchange list' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExchangesController.prototype, "listExchanges", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('connect'),
    swagger_1.ApiResponse({ status: 200, description: 'Utilizador associado com sucesso' }),
    swagger_1.ApiResponse({ status: 200, description: 'Erro ao conectar utilizador com exchange' }),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, exchange_connection_info_dto_1.ExchangeConnectionDto]),
    __metadata("design:returntype", Promise)
], ExchangesController.prototype, "connect", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('wallet/:connectionId'),
    __param(0, common_1.Param('connectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExchangesController.prototype, "getWallet", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('connections'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExchangesController.prototype, "listConnectionsForUser", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('disconnect/:connectionId'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('connectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExchangesController.prototype, "removeExchange", null);
ExchangesController = __decorate([
    common_1.Controller('exchanges'),
    __metadata("design:paramtypes", [exchanges_service_1.ExchangesService])
], ExchangesController);
exports.ExchangesController = ExchangesController;
//# sourceMappingURL=exchanges.controller.js.map