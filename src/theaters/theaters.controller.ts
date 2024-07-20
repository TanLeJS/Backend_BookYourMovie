import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { currentUser, Public } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { TheatersService } from './theaters.service';

@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Post()
  create(
    @Body() createTheaterDto: CreateTheaterDto,
    @currentUser() user: IUser,
  ) {
    return this.theatersService.create(createTheaterDto, user);
  }

  @Public()
  @Get()
  findAll() {
    return this.theatersService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.theatersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTheaterDto: UpdateTheaterDto,
    @currentUser() user: IUser,
  ) {
    return this.theatersService.update(id, updateTheaterDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @currentUser() user: IUser) {
    return this.theatersService.remove(id, user);
  }
}
