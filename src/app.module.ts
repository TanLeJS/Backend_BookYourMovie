import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ScreeningModule } from './screening/screening.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuditoriumModule } from './auditorium/auditorium.module';
import { SeatModule } from './seat/seat.module';
import { SeatReservedModule } from './seat_reserved/seat_reserved.module';
import { MovieModule } from './movie/movie.module';


@Module({
  imports: 
  [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    // MongooseModule.forRoot(''),
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    AdminModule,
    ScreeningModule,
    ReservationModule,
    AuditoriumModule,
    SeatModule,
    SeatReservedModule,
    MovieModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
