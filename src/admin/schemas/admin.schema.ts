import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  isAdmin: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
