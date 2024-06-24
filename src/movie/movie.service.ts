import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesRepository } from './movie.repository';

@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private moviesRepository: MoviesRepository,
  ) {}

  @Cron('0 0 0 * * * ') // This cron job runs every day at midnight
  async handleCronJob() {
    const moviesCount = await this.moviesRepository.countMovies();
    if (moviesCount === 0) {
      await this.fetchAndSaveInitialMovies();
    } else {
      await this.fetchAndSaveLatestMovies();
    }
  }

  headersRequest = {
    'Content-Type': 'application/json', // afaik this one is not needed
    Authorization: `Bearer ${this.configService.get<string>('THEMOVIEDB_ACCESSTOKEN')}`,
  };

  apiURL = `${this.configService.get<string>('THEMOVIEDB_URI')}movie/now_playing?language=en-US&page=1`;

  private async fetchAndSaveInitialMovies() {
    this.logger.debug('Database is empty. Fetching initial movies from API...');

    try {
      const response = await lastValueFrom(
        this.httpService.get(this.apiURL, { headers: this.headersRequest }),
      );

      const allMovies = response.data.results;
      console.log('print all movies', allMovies);
      await this.moviesRepository.bulkCreate(allMovies);
      this.logger.debug(`Added ${allMovies.length} movies to the database.`);
    } catch (error) {
      this.logger.error('Error fetching initial movies', error);
    }
  }

  private async fetchAndSaveLatestMovies() {
    this.logger.debug('Fetching latest movies from API...');

    try {
      const response = await lastValueFrom(
        this.httpService.get(this.apiURL, { headers: this.headersRequest }),
      );
      const latestMovies = response.data.results;
      // Fetch existing movies
      const existingMovies = await this.moviesRepository.findAllMovies();
      const existingMovieIds = new Set(
        existingMovies.map((movie) => movie.title),
      );
      // Filter out movies that already exist
      const newMovies = latestMovies.filter(
        (movie) => !existingMovieIds.has(movie.title),
      );

      // Use bulk create for new movies
      if (newMovies.length > 0) {
        await this.moviesRepository.bulkCreate(newMovies);
        this.logger.debug(`Added ${newMovies.length} new movies.`);
      } else {
        this.logger.debug('No new movies to add.');
      }
    } catch (error) {
      this.logger.error('Error fetching latest movies', error);
    }
  }

  async getAllMovies() {
    return this.moviesRepository.findAllMovies();
  }

  async create(createMovieDto: CreateMovieDto, user) {
    return await this.moviesRepository.createMovie(createMovieDto, user);
  }

  async findOne(id: string) {
    return await this.moviesRepository.findMovieById(id);
  }

  async update(id, updateMovieDto, user) {
    return await this.moviesRepository.updateMovieById(
      id,
      updateMovieDto,
      user,
    );
  }

  async remove(id: string, user) {
    return await this.moviesRepository.deleteMovieById(id, user);
  }
}
