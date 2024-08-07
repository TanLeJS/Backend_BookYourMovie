import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

@Schema({ timestamps: true })
export class Theater {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: Number, required: true })
  zip_code: number;

  @Prop({ type: Number, required: true })
  totalSeats: number;

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

export type TheaterDocument = Theater & Document;
export const TheaterSchema = SchemaFactory.createForClass(Theater);
TheaterSchema.plugin(softDeletePlugin);
