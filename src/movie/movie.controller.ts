import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { currentUser, Public, ResponseMessage } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ResponseMessage('Fetch all movies')
  @Get()
  findAllMovies() {
    return this.movieService.getAllMovies();
  }

  @Get('current')
  @ResponseMessage('Fetch all current movies')
  findCurrentPlayingMovies() {
    return this.movieService.getCurrentPlayingMovies();
  }

  @Get('upcoming')
  @ResponseMessage('Fetch all upcoming movies')
  findUpComingMovies() {
    return this.movieService.getUpComingMovies();
  }

  @Get(':id')
  @ResponseMessage('Get movie by ID')
  @Public()
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Post()
  @ResponseMessage('Create a new movie')
  createANewMovie(
    @Body() createMovieDto: CreateMovieDto,
    @currentUser() user: IUser,
  ) {
    return this.movieService.create(createMovieDto, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @currentUser() user: IUser,
  ) {
    return this.movieService.update(id, updateMovieDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @currentUser() user: IUser) {
    return this.movieService.remove(id, user);
  }
}
