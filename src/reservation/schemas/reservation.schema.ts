import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
  @Prop()
  screening_id: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'screening';
  };

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  contact: number;

  @Prop()
  seats: [];
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
