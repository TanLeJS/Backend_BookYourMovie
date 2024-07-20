import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Screen, ScreenSchema } from './schema/screen.schema';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Screen.name, schema: ScreenSchema }]),
  ],
  controllers: [ScreensController],
  providers: [ScreensService],
})
export class ScreensModule {}
