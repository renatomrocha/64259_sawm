import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";


export type ExchangeDocument = Exchange & Document;


@Schema()
export class Exchange {

    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty()
    @Prop()
    apiUrl: string;

    @ApiProperty()
    @Prop()
    logoUrl: string;

}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
