import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Theater, TheaterSchema } from './schema/theater.schema';
import { TheatersController } from './theaters.controller';
import { TheatersService } from './theaters.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Theater.name, schema: TheaterSchema }]),
  ],
  controllers: [TheatersController],
  providers: [TheatersService],
})
export class TheatersModule {}
