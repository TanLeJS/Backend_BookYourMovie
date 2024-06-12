import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie, MovieSchema } from './schema/movie.schema';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
