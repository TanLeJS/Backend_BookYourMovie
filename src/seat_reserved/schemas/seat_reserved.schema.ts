import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SeatReservedDocument = HydratedDocument<SeatReserved>;

@Schema()
export class SeatReserved {
  @Prop()
  seat: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'seat';
  };

  @Prop()
  reservation: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'reservation';
  };

  @Prop()
  screening: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'screening';
  };
}

export const SeatReservedSchema = SchemaFactory.createForClass(SeatReserved);
