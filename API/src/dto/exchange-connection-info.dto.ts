import { ApiProperty } from '@nestjs/swagger';

export class ExchangeConnectionDto {
  @ApiProperty()
  exchange: string;
  @ApiProperty()
  apiSecret: string;
  @ApiProperty()
  secretKey: string;
}
