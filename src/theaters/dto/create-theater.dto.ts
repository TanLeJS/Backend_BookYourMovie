import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTheaterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  zip_code: number;

  @IsNotEmpty()
  @IsNumber()
  totalSeats: number;
}
