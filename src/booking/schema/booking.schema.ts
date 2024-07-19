import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Schedule } from 'src/schedules/schema/schedule.schema';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true,
  })
  schedule: Schedule;

  @Prop({
    type: [
      {
        label: { type: String, required: true },
        status: { type: String, required: true },
      },
    ],
    required: true,
  })
  seats: {
    label: string;
    status: string;
  }[];

  // Add more fields as necessary
}

export type BookingDocument = Booking & Document;
export const BookingSchema = SchemaFactory.createForClass(Booking);
