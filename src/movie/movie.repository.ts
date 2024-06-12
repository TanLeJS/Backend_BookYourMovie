import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from 'src/movie/schema/movie.schema';

@Injectable()
export class MoviesRepository {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async findMovieById(id: string): Promise<Movie | null> {
    return this.movieModel.findOne({ id }).exec();
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
}
