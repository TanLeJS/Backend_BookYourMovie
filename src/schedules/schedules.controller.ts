import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Date } from 'mongoose';
import { currentUser, Public } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleService } from './schedules.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(
    @Body() createScheduleDto: CreateScheduleDto,
    @currentUser() user: IUser,
  ) {
    return this.scheduleService.create(createScheduleDto, user);
  }

  @Public()
  @Get()
  findScheduleOfMovieByDate(
    @Query('movieID') movieID: string, //
    @Query('date') date: Date,
  ) {
    return this.scheduleService.findScheduleByDate(movieID, date);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @currentUser() user: IUser,
  ) {
    return this.scheduleService.update(id, updateScheduleDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @currentUser() user: IUser) {
    return this.scheduleService.remove(id, user);
  }
}
