import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { Screen, ScreenDocument } from './schema/screen.schema';

@Injectable()
export class ScreensService {
  constructor(
    @InjectModel(Screen.name)
    private screenModel: SoftDeleteModel<ScreenDocument>,
  ) {}

  async create(createScreenDto: CreateScreenDto, user: IUser) {
    const { name, totalSeats, theater } = createScreenDto;
    const { email, _id } = user;

    const newScreen = await this.screenModel.create({
      name,
      totalSeats,
      theater,
      createdBy: { _id, email },
    });
    return {
      _id: newScreen?._id,
      createdAt: newScreen?.createdAt,
    };
  }

  async findAll() {
    return this.screenModel.find();
  }

  async findScreenByTheatre() {
    return this.screenModel.find();
  }

  async findOne(id: string) {
    const screen = await this.screenModel.findById(id);
    if (!screen) {
      throw new NotFoundException(`Schedule #${id} not found`);
    }
    return screen;
  }

  async update(id: string, updateScreenDto: UpdateScreenDto, user) {
    const existingScreen = await this.screenModel
      .findByIdAndUpdate(id, updateScreenDto, { new: true })
      .exec();
    if (!existingScreen) {
      throw new NotFoundException(`Schedule #${id} not found`);
    }

    existingScreen.updatedBy = {
      _id: user._id,
      email: user.email,
    };

    await existingScreen.save();
    return existingScreen;
  }

  async remove(id: string, user) {
    const screen = await this.screenModel.findById(id);
    if (!screen) {
      throw new NotFoundException(`Schedule #${id} not found`);
    }

    await this.screenModel.updateOne(
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

    await this.screenModel.softDelete({ _id: id });

    // Return the schedule with 'deletedBy' field updated
    screen.deletedBy = {
      _id: user._id,
      email: user.email,
    };

    return screen;
  }
}
