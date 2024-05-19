import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SeatDocument = HydratedDocument<Seat>;

@Schema()
export class Seat {
  @Prop()
  number: number;

  @Prop()
  auditorium: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'auditorium';
  };
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
