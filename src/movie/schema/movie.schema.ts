import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  adult: boolean;

  @Prop({ required: true })
  backdrop_path: string;

  @Prop({ required: true })
  genre_ids: string[];

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  original_language: string;

  @Prop({ required: true })
  original_title: string;

  @Prop({ required: true })
  overview: string;

  @Prop({ required: true })
  popularity: number;

  @Prop({ required: true })
  poster_path: string;

  @Prop({ required: true })
  release_date: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  video: false;

  @Prop({ required: true })
  vote_average: number;

  @Prop({ required: true })
  vote_count: number;

  @Prop({ required: true })
  screening: {
    type: number;
    default: 0;
  };
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
