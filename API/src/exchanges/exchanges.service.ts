// import * from CryptoJS as crypto;
import {
  ExchangeConnection,
  ExchangeConnectionDocument,
} from '../schemas/exchange.connection.schema';
import { ExchangeDocument } from '../schemas/exchange.schema';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exchange } from 'src/schemas/exchange.schema';
import { Model } from 'mongoose';
import { BinanceApiService } from '../binance_api/binance.api.service';
import { User, UserDocument } from '../schemas/user.schema';
import { throwError } from 'rxjs';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectModel(Exchange.name) private exchangeModel: Model<ExchangeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(ExchangeConnection.name)
    private exchangeConnectionModel: Model<ExchangeConnectionDocument>,
    private httpService: HttpService,
    private binanceApiService: BinanceApiService,
  ) {}

  async create(exchange: any): Promise<Exchange> {
    const createdUser = new this.exchangeModel(exchange);
    return createdUser.save();
  }

  async createConnection(
    exchange: any,
    connectionInfo: any,
  ): Promise<ExchangeConnection> {
    const exchangeConnectionObj = {
      exchange: exchange,
      apiKey: connectionInfo.apiKey,
      secretKey: connectionInfo.secretKey,
    };
    const createdConnection = new this.exchangeConnectionModel(
      exchangeConnectionObj,
    );
    return createdConnection.save();
  }

  async findAll(): Promise<Exchange[]> {
    return this.exchangeModel.find().exec();
  }

  async findById(id): Promise<Exchange> {
    return this.exchangeModel.findById(id);
  }

  async getAccountWalletForExchange(exchangeConnectionId) {
    return this.exchangeConnectionModel
      .findById(exchangeConnectionId)
      .populate('exchange')
      .then(
        (exchangeConnection) => {
          return this.binanceApiService.getSpotAccountBalance(
            exchangeConnection,
          );
        },
        (err) => console.log('Apanhei erro: ', err),
      );
  }

  async findConnectionsForUser(id: string) {
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

  async connectUserToExchange(userId: string, exchangeConnectionInfo: any) {
    console.log('Recebi exchangeinfo: ', exchangeConnectionInfo);
    this.exchangeModel
      .findById(exchangeConnectionInfo.exchange)
      .then((exchange) => {
        console.log('Encontrei exchange: ', exchange);
        try {
          this.userModel.findById(userId).then(async (user) => {
            try {
              const newConnection = await this.createConnection(
                exchange,
                exchangeConnectionInfo,
              );
              user.exchangeConnections.push(newConnection);
              user.save();
              return user;
            } catch (err) {
              console.log('Erro: ', err);
            }
          });
        } catch (err) {
          throw new Error('Erro ao conectar utilizador com exchange');
        }
      });
  }

  async removeExchange(userId: string, exchangeId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { exchangeConnections: exchangeId } },
      { new: true },
    );
  }
}
