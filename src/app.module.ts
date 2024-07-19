import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditoriumModule } from './auditorium/auditorium.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { ReservationModule } from './reservation/reservation.module';
import { ScheduleModule } from './schedules/schedules.module';

import { SeatModule } from './seat/seat.module';
import { SeatReservedModule } from './seat_reserved/seat_reserved.module';
import { UsersModule } from './users/users.module';
import { BookingModule } from './booking/booking.module';
import { TheatersModule } from './theaters/theaters.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
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
      envFilePath: '.development.env',
    }),
    AdminModule,
    ReservationModule,
    AuditoriumModule,
    SeatModule,
    SeatReservedModule,
    MovieModule,
    AuthModule,
    ScheduleModule,
    BookingModule,
    TheatersModule,
    PaymentModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
