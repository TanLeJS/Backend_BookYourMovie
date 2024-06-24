import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @IsBoolean({ message: 'Please choose true or false' })
  adult: boolean;

  @IsNotEmpty({ message: 'Name should not be empty' })
  status: string;

  @IsNotEmpty({ message: 'Name should not be empty' })
  title: string;

  @IsNotEmpty({ message: 'Name should not be empty' })
  overview: string;

  @IsNotEmpty({ message: 'Original language should not be empty' })
  original_language: string;

  @IsNotEmpty({ message: 'Image should not be empty' })
  poster_path: string;

  @IsNotEmpty({ message: 'Release date should not be empty' })
  release_date: string;

  @IsNotEmpty({ message: 'Trailer should not be empty' })
  trailer: string;

  @IsNotEmpty({ message: 'Director should not be empty' })
  director: string;

  @IsArray({ message: 'Actors should be an array' })
  @ArrayNotEmpty({ message: 'Actors array should not be empty' })
  @ArrayMinSize(1, { message: 'There should be at least one actor' })
  @IsString({ each: true, message: 'Each actor should be a non-empty string' })
  actors: string[];

  @IsArray({ message: 'Genre should be an array' })
  @ArrayNotEmpty({ message: 'Actors array should not be empty' })
  @IsString({ each: true, message: 'Each actor should be a non-empty string' })
  @ArrayMinSize(1, { message: 'There should be at least one actor' })
  genres: string[];

  @IsNotEmpty({ message: 'Duration should not be empty' })
  duration: number;
}
