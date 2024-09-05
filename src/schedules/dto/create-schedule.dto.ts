import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

class SeatDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsString()
  movie: string;

  @IsNotEmpty()
  @IsString()
  screen: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsString()
  format: string;

  @IsNotEmpty()
  @IsString()
  ticketPrices: {
    Adult: number;
    Senior: number;
    Child: number;
  };

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => SeatDto)
  // seats: SeatDto[];
}
