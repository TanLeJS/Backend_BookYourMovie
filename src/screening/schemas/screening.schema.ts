import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScreeningDocument = HydratedDocument<Screening>;

@Schema()
export class Screening {
  @Prop()
  movie: {
    type: Object;
  };

  @Prop()
  screening_start: number;

  @Prop()
  audi_id: string;

  @Prop()
  seats: [
    {
      id: string;
      available: boolean;
    },
  ];
}

export const ScreeningSchema = SchemaFactory.createForClass(Screening);
