import { Injectable, HttpService } from '@nestjs/common';
import { tap, map } from 'rxjs/operators';
import crypto from 'crypto';
// const crypto = require('crypto');

@Injectable()
export class BinanceApiService {
  constructor(private httpService: HttpService) {}

  public async getSpotAccountBalance(exchangeConnectionInfo) {
    const endpoint = 'account';
    const query = '';
    return this.buildRequest(exchangeConnectionInfo, query, endpoint);
  }

  // Query String must contain &...
  private async buildRequest(
    exchangeConnectionInfo,
    queryString,
    endpointExtension,
  ) {
    const headersRequest = {
      'X-MBX-APIKEY': exchangeConnectionInfo.apiKey,
    };
    const timestamp = Date.now();
    const signature = this.signature(
      'timestamp=' + timestamp + queryString,
      exchangeConnectionInfo.secretKey,
    );
    const request =
      exchangeConnectionInfo.exchange.apiUrl +
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
    return this.httpService.get(request, { headers: headersRequest }).pipe(
      tap((t) => console.log('Received: ', Object.keys(t))),
      map((r) => r.data),
    );
  }

  private signature(queryString, apiSecret) {
    return crypto
      .createHmac('sha256', apiSecret)
      .update(queryString)
      .digest('hex');
  }
}
