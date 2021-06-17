import { ExchangeConnection } from './exchange.connection.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExchangeConnection' }],
  })
  @ApiProperty()
  exchangeConnections: ExchangeConnection[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// Decorators são utilizados pelo Schemafactory para extrapolar um schema através da class com recurso a reflection
// Podemos definir schema manualmente como fazemos no nodejs
