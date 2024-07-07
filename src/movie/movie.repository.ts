import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Movie, MovieDocument } from 'src/movie/schema/movie.schema';
import { IUser } from 'src/users/user.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

const genresDictionary = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: SoftDeleteModel<MovieDocument>,
  ) {}

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
    type: string,
  ) {
    let typeToSort = null;
    Object.entries(genresDictionary).forEach(([key, value]) => {
      if (type === value) {
        typeToSort = key;
      }
    });
    let filter = {};
    if (typeToSort !== null) {
      filter = { genre_ids: { $in: [parseInt(typeToSort)] } };
    }

    const offset = (currentPage - 1) * limit;
    const defaultLimit = limit ?? 20;
    const totalItems = await this.movieModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.movieModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .exec();
    return {
      pagination: {
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
