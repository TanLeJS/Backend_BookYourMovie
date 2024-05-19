import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: number;

  @Prop()
  ratings: string;

  @Prop()
  director: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  release: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  screening: {
    type: number;
    default: 0;
  };
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
