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
exports.UsersService = void 0;
const exchange_schema_1 = require("../schemas/exchange.schema");
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_2 = require("@nestjs/mongoose");
let UsersService = class UsersService {
    constructor(userModel, exchangeModel) {
        this.userModel = userModel;
        this.exchangeModel = exchangeModel;
    }
    async create(userDto) {
        const createdUser = new this.userModel(userDto);
        let newUser;
        try {
            newUser = await createdUser.save();
        }
        catch (e) {
            throw 'Username already used by another account';
        }
        return newUser;
    }
    async findOne(username) {
        return this.userModel.findOne({ username: username }).exec();
    }
    async getProfile(id) {
        const user = (await this.userModel.findById(id)).execPopulate();
        if (user) {
            return user;
        }
        else {
            throw new Error('User not found');
        }
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(user_schema_1.User.name)),
    __param(1, mongoose_2.InjectModel(exchange_schema_1.Exchange.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map