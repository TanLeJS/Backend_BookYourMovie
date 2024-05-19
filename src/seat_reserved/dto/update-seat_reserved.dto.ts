import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatReservedDto } from './create-seat_reserved.dto';

export class UpdateSeatReservedDto extends PartialType(CreateSeatReservedDto) {}
