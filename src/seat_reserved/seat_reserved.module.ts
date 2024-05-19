import { Module } from '@nestjs/common';
import { SeatReservedService } from './seat_reserved.service';
import { SeatReservedController } from './seat_reserved.controller';

@Module({
  controllers: [SeatReservedController],
  providers: [SeatReservedService],
})
export class SeatReservedModule {}
