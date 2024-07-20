import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Theater } from 'src/theaters/schema/theater.schema';

@Schema({ timestamps: true })
export class Screen {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  totalSeats: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true,
  })
  theater: Theater;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deleteAt: Date;
}

export type ScreenDocument = Screen & Document;
export const ScreenSchema = SchemaFactory.createForClass(Screen);
