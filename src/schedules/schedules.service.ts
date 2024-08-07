import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule, ScheduleDocument } from './schema/schedule.schema';

interface Theater extends Document {}

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private scheduleModel: SoftDeleteModel<ScheduleDocument>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto, user: IUser) {
    const { movie, screen, date, time, format } = createScheduleDto;
    const { email, _id } = user;

    const newSchedule = await this.scheduleModel.create({
      movie,
      screen,
      date,
      time,
      format,
      createdBy: { _id, email },
    });
    return {
      _id: newSchedule?._id,
      createdAt: newSchedule?.createdAt,
    };
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleModel
      .find()
      .populate('movie')
      .populate('screen')
      .exec();
  }

  async findOne(id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel
      .findById(id)
      .populate('movie')
      .populate('screen')
      .exec();
    if (!schedule) {
      throw new NotFoundException(`Schedule #${id} not found`);
    }
    return schedule;
  }

  async findScheduleByDate(movieID: string, date: Date) {
    // Fetch and populate schedules
    const schedules = await this.scheduleModel
      .find({
        movie: movieID,
        date: date,
      })
      .populate({
        path: 'screen',
        populate: {
          path: 'theater',
        },
      })
      .exec();

    // Group schedules by theater
    const schedulesByTheater = schedules.reduce((acc, schedule) => {
      const theaterID = schedule.screen.theater._id.toString();

      if (!acc[theaterID]) {
        acc[theaterID] = {
          theater: schedule.screen.theater,
          schedules: [],
        };
      }
      acc[theaterID].schedules.push(schedule);
      return acc;
    }, {});

    // Convert the grouped schedules object into an array of objects
    return Object.values(schedulesByTheater);
  }

  async update(
    id: string,
    updateScheduleDto: UpdateScheduleDto,
    user: IUser,
  ): Promise<Schedule> {
    const existingSchedule = await this.scheduleModel
      .findByIdAndUpdate(id, updateScheduleDto, { new: true })
      .exec();
    if (!existingSchedule) {
      throw new NotFoundException(`Schedule #${id} not found`);
    }

    existingSchedule.updatedBy = {
      _id: user._id,
      email: user.email,
    };

    await existingSchedule.save();
    return existingSchedule;
  }

  async remove(id: string, user: IUser): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(id);
    if (!schedule) {
      throw new NotFoundException(`Schedule #${id} not found`);
    }

    await this.scheduleModel.updateOne(
      { _id: id },
      {
        $set: {
          deletedBy: {
            _id: user._id,
            email: user.email,
          },
        },
      },
    );

    await this.scheduleModel.softDelete({ _id: id });

    // Return the schedule with 'deletedBy' field updated
    schedule.deletedBy = {
      _id: user._id,
      email: user.email,
    };

    return schedule;
  }
}
