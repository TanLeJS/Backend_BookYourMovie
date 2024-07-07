import { IsNumber, IsOptional } from 'class-validator';

export class GetRecordsDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;
}
