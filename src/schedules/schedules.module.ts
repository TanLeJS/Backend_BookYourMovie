import { Module } from '@nestjs/common';
import { ScheduleController } from './schedules.controller';
import { ScheduleService } from './schedules.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
