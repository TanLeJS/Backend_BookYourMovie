import { Injectable } from '@nestjs/common';
import { CreateSeatReservedDto } from './dto/create-seat_reserved.dto';
import { UpdateSeatReservedDto } from './dto/update-seat_reserved.dto';

@Injectable()
export class SeatReservedService {
  create(createSeatReservedDto: CreateSeatReservedDto) {
    return 'This action adds a new seatReserved';
  }

  findAll() {
    return `This action returns all seatReserved`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seatReserved`;
  }

  update(id: number, updateSeatReservedDto: UpdateSeatReservedDto) {
    return `This action updates a #${id} seatReserved`;
  }

  remove(id: number) {
    return `This action removes a #${id} seatReserved`;
  }
}
