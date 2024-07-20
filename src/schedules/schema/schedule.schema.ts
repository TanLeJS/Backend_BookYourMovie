import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Movie } from 'src/movie/schema/movie.schema';

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true })
  movie: Movie;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true })
  screen: Screen;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  time: string;

  @Prop({
    type: [
      {
        label: { type: String, required: true },
        status: { type: String, required: true, default: 'available' },
      },
    ],
    required: true,
    default: () => Schedule.initializeSeats(),
  })
  seats: {
    label: string;
    status: string;
  }[];

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

  // Method to initialize seats
  static initializeSeats() {
    const rows = 'ABCDEFGHIJKLMN';
    const seats = [];

    for (let row = 0; row < rows.length; row++) {
      for (let seatNumber = 1; seatNumber <= 18; seatNumber++) {
        seats.push({
          label: `${rows[row]}${seatNumber}`,
          status: 'available',
        });
      }
    }

    return seats;
  }
}

export type ScheduleDocument = Schedule & Document;
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
ScheduleSchema.plugin(softDeletePlugin);
