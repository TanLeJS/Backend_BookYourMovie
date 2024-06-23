import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Movie, MovieDocument } from 'src/movie/schema/movie.schema';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectModel(Movie.name) private movieModel: SoftDeleteModel<MovieDocument>,
  ) {}

  async findMovieById(id: string): Promise<Movie | null> {
    return this.movieModel.findOne({ _id: id }).exec();
  }

  async createMovie(movieData: Partial<Movie>): Promise<Movie> {
    const movie = new this.movieModel(movieData);
    return movie.save();
  }

  async bulkCreate(moviesData: Partial<Movie>[]): Promise<Movie[]> {
    const createdMovies = await this.movieModel.insertMany(moviesData);
    // Map createdMovies to ensure they match the Movie type
    return createdMovies.map((movie) => movie.toObject() as Movie);
  }

  async findAllMovies(): Promise<Movie[]> {
    return await this.movieModel.find().exec();
  }

  async countMovies(): Promise<number> {
    return await this.movieModel.countDocuments().exec();
  }

  async updateMovieById(id: string, updateMovieDto: Partial<Movie>, user) {
    return await this.movieModel.updateOne(
      { _id: id },
      {
        ...updateMovieDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
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
      },
    );
    return await this.movieModel.softDelete({ _id: id });
  }
}
