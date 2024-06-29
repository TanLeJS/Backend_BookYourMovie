import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop()
  adult: boolean;

  @Prop()
  status: string;

  @Prop()
  title: string;

  @Prop()
  genres: string;

  @Prop()
  backdrop_path: string;

  @Prop()
  genre_ids: string[];

  @Prop()
  id: string;

  @Prop()
  original_language: string;

  @Prop({})
  original_title: string;

  @Prop()
  overview: string;

  @Prop()
  popularity: number;

  @Prop()
  poster_path: string;

  @Prop()
  release_date: string;

  @Prop()
  video: false;

  @Prop()
  trailer: string;

  @Prop()
  duration: number;

  @Prop()
  director: string;

  @Prop()
  actors: string;

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
MovieSchema.plugin(softDeletePlugin);
