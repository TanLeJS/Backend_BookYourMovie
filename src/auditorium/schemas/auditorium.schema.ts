import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuditoriumDocument = HydratedDocument<Auditorium>;

@Schema()
export class Auditorium {
  @Prop({ required: true, enum: ['audi1', 'audi2', 'audi3'] })
  name: string;

  @Prop()
  showTimes: [
    {
      start: number;
      available: boolean;
    },
  ];
}

export const AuditoriumSchema = SchemaFactory.createForClass(Auditorium);
