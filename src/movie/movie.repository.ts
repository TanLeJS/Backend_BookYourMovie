import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Movie, MovieDocument } from 'src/movie/schema/movie.schema';
import { IUser } from 'src/users/user.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
@Injectable()
export class MoviesRepository {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: SoftDeleteModel<MovieDocument>,
  ) {}

  'genres': [
    {
      id: 28;
      name: 'Action';
    },
    {
      id: 12;
      name: 'Adventure';
    },
    {
      id: 16;
      name: 'Animation';
    },
    {
      id: 35;
      name: 'Comedy';
    },
    {
      id: 80;
      name: 'Crime';
    },
    {
      id: 99;
      name: 'Documentary';
    },
    {
      id: 18;
      name: 'Drama';
    },
    {
      id: 10751;
      name: 'Family';
    },
    {
      id: 14;
      name: 'Fantasy';
    },
    {
      id: 36;
      name: 'History';
    },
    {
      id: 27;
      name: 'Horror';
    },
    {
      id: 10402;
      name: 'Music';
    },
    {
      id: 9648;
      name: 'Mystery';
    },
    {
      id: 10749;
      name: 'Romance';
    },
    {
      id: 878;
      name: 'Science Fiction';
    },
    {
      id: 10770;
      name: 'TV Movie';
    },
    {
      id: 53;
      name: 'Thriller';
    },
    {
      id: 10752;
      name: 'War';
    },
    {
      id: 37;
      name: 'Western';
    },
  ];

  async findMovieById(id: string): Promise<Movie | null> {
    return this.movieModel.findOne({ _id: id }).exec();
  }

  async findCurrentPlayingMovies() {
    return await this.movieModel
      .find({ status: 'currentPlaying' })
      .limit(20)
      .exec();
  }

  async findUpComingMovies(): Promise<Movie[]> {
    return await this.movieModel.find({ status: 'upComing' }).exec();
  }

  async createMovie(movieData: CreateMovieDto, user: IUser) {
    const {
      adult,
      status,
      title,
      overview,
      original_language,
      poster_path,
      release_date,
      trailer,
      director,
      actors,
      genres,
      duration,
    } = movieData;
    const { _id, email } = user;
    const isExist = await this.movieModel.findOne({ title });
    if (isExist) {
      throw new BadRequestException(`This movie: ${title} đã tồn tại`);
    }
    const newMovie = await this.movieModel.create({
      adult,
      status,
      title,
      overview,
      original_language,
      poster_path,
      release_date,
      trailer,
      director,
      actors,
      genres,
      duration,
      createdBy: { _id, email },
      createdAt: new Date(),
    });
    return {
      _id: newMovie?._id,
      createdAt: newMovie?.createdAt,
    };
  }

  async bulkCreate(moviesData: Partial<Movie>[]): Promise<Movie[]> {
    const createdMovies = await this.movieModel.insertMany(moviesData);
    // Map createdMovies to ensure they match the Movie type
    return createdMovies.map((movie) => movie.toObject() as Movie);
  }

  async findAllMovies(): Promise<Movie[]> {
    return await this.movieModel.find().exec();
  }

  async findAllMoviesWithPaginate(
    currentPage: number,
    limit: number,
    qs: string,
  ) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    const offset = (currentPage - 1) * limit;
    const defaultLimit = limit ? limit : 20;
    const totalItems = (await this.movieModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.movieModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: defaultLimit,
        pages: totalPages,
        total: totalItems,
      },
      result, //kết quả query
    };
  }

  async countMovies(): Promise<number> {
    return await this.movieModel.countDocuments().exec();
  }

  async updateMovieById(id: string, updateMovieDto: UpdateMovieDto, user) {
    return await this.movieModel.updateOne(
      { _id: id },
      {
        ...updateMovieDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
        updatedAt: new Date(),
      },
    );
  }

  async deleteMovieById(id: string, user) {
    await this.movieModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
        deletedAt: new Date(),
      },
    );

    // Soft delete the document
    return await this.movieModel.softDelete({ _id: id });
  }
}
