import { ExchangesService } from './exchanges.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Exchange } from 'src/schemas/exchange.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExchangeConnectionDto } from '../dto/exchange-connection-info.dto';
import {ApiBearerAuth, ApiHeader, ApiResponse} from '@nestjs/swagger';

@Controller('exchanges')
export class ExchangesController {
  constructor(private exchangesService: ExchangesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Exchange list' })
  async listExchanges(): Promise<Exchange[]> {
    return this.exchangesService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('connect')
  @ApiResponse({ status: 200, description: 'Utilizador associado com sucesso' })
  @ApiResponse({ status: 200, description: 'Erro ao conectar utilizador com exchange' })
  async connect(
    @Request() req,
    @Body() exchangeConnectionInfo: ExchangeConnectionDto,
  ) {
    return this.exchangesService
      .connectUserToExchange(req.user.id, exchangeConnectionInfo)
      .then(
        () => console.log('Utilizador associado com sucesso'),
        () => console.log('Erro ao conectar utilizador com exchange'),
      );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('wallet/:connectionId')
  async getWallet(@Param('connectionId') connectionId: string): Promise<any> {
    return this.exchangesService.getAccountWalletForExchange(connectionId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('connections')
  async listConnectionsForUser(@Request() req) {
    return this.exchangesService.findConnectionsForUser(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('disconnect/:connectionId')
  async removeExchange(
    @Request() req,
    @Param('connectionId') connectionId: string,
  ) {
    return this.exchangesService.removeExchange(req.user.id, connectionId);
  }
}
