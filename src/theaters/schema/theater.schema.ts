import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Theater {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: Number, required: true })
  totalSeats: number;

}

export type TheaterDocument = Theater & Document;
export const TheaterSchema = SchemaFactory.createForClass(Theater);
