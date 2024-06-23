import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { currentUser, Public, ResponseMessage } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';
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

  @Get(':id')
  @ResponseMessage('Get company by ID')
  @Public()
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
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
