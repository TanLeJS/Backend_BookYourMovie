import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class SeatDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: mongoose.ObjectId;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsMongoId()
  @IsNotEmpty()
  schedule: mongoose.ObjectId;

  @IsString()
  @IsNotEmpty()
  paypalOrderID: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  @IsOptional() // optional in case seats are not selected at creation
  selectedSeat: SeatDto[];

  @IsString()
  @IsNotEmpty()
  totalPrice: string;

  @IsBoolean()
  @IsOptional() // default is true if not provided
  pending?: boolean;
}
