import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Schedule } from 'src/schedules/schema/schedule.schema';

interface ISeat {
  _id: mongoose.ObjectId;
  label: string;
  status: string;
}

@Schema({ timestamps: true })
export class Order {
  @Prop()
  email: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
  })
  schedule: Schedule;

  @Prop()
  paypalOrderID: string;

  @Prop()
  selectedSeat: ISeat[];

  @Prop()
  totalPrice: string;

  @Prop({ type: Boolean, default: true })
  pending: boolean; // To track if the order is still pending
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index(
  { lastModifiedDate: 1 },
  {
    expireAfterSeconds: 420, // 7 minutes = 420 seconds
    partialFilterExpression: { pending: true },
  },
);
OrderSchema.plugin(softDeletePlugin);
