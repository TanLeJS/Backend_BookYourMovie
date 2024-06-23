import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop()
  adult: boolean;

  @Prop()
  status: string;

  @Prop()
  backdrop_path: string;

  @Prop()
  genre_ids: string[];

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  original_language: string;

  @Prop({})
  original_title: string;

  @Prop({ required: true })
  overview: string;

  @Prop()
  popularity: number;

  @Prop({ required: true })
  poster_path: string;

  @Prop({ required: true })
  release_date: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  video: false;

  @Prop()
  trailer: string;

  @Prop()
  duration: number;

  @Prop()
  director: string;

  @Prop()
  actors: string[];

  @Prop()
  genre: string;

  @Prop()
  vote_average: number;

  @Prop()
  vote_count: number;

  @Prop({ type: Object })
  screening: {
    type: number;
    default: 0;
  };

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

export const MovieSchema = SchemaFactory.createForClass(Movie);
