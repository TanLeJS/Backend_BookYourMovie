import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { Theater, TheaterDocument } from './schema/theater.schema';

@Injectable()
export class TheatersService {
  constructor(
    @InjectModel(Theater.name)
    private theaterModel: SoftDeleteModel<TheaterDocument>,
  ) {}

  async create(createTheaterDto: CreateTheaterDto, user: IUser) {
    const { name, location, zip_code, totalSeats } = createTheaterDto;
    const { email, _id } = user;

    const newTheater = await this.theaterModel.create({
      name,
      location,
      zip_code,
      totalSeats,
      createdBy: { _id, email },
    });
    return {
      _id: newTheater?._id,
      createdAt: newTheater?.createdAt,
    };
  }

  async findAll() {
    const result = await this.theaterModel.find();
    return result;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return new BadRequestException(`Not found theater with id = ${id}`);

    return await this.theaterModel.findOne({
      _id: id,
    }); //exclude
  }

  async update(id: string, updateTheaterDto: UpdateTheaterDto, user: IUser) {
    return await this.theaterModel.updateOne(
      { _id: id },
      {
        ...updateTheaterDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    await this.theaterModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.theaterModel.softDelete({ _id: id });
  }
}
