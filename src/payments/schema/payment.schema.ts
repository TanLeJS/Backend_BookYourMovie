import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Booking } from 'src/booking/schema/booking.schema';

@Schema({ timestamps: true })
export class Payment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  })
  booking: Booking;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true })
  paymentMethod: string;

  @Prop({ type: Date, default: Date.now })
  paymentDate: Date;

  // Add more fields as necessary
}

export type PaymentDocument = Payment & Document;
export const PaymentSchema = SchemaFactory.createForClass(Payment);
