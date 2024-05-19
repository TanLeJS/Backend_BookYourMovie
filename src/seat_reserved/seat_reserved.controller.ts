import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatReservedService } from './seat_reserved.service';
import { CreateSeatReservedDto } from './dto/create-seat_reserved.dto';
import { UpdateSeatReservedDto } from './dto/update-seat_reserved.dto';

@Controller('seat-reserved')
export class SeatReservedController {
  constructor(private readonly seatReservedService: SeatReservedService) {}

  @Post()
  create(@Body() createSeatReservedDto: CreateSeatReservedDto) {
    return this.seatReservedService.create(createSeatReservedDto);
  }

  @Get()
  findAll() {
    return this.seatReservedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatReservedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatReservedDto: UpdateSeatReservedDto) {
    return this.seatReservedService.update(+id, updateSeatReservedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatReservedService.remove(+id);
  }
}
