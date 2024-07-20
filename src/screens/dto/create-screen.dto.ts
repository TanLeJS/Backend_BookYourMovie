import { IsNotEmpty, IsString } from 'class-validator';
import { Theater } from 'src/theaters/schema/theater.schema';

export class CreateScreenDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  totalSeats: number;

  @IsNotEmpty()
  theater: Theater;
}
