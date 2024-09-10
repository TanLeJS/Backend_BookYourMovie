import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { MovieModule } from './movie/movie.module';
import { PaymentsModule } from './payments/payments.module';
import { ScheduleModule } from './schedules/schedules.module';
import { TheatersModule } from './theaters/theaters.module';
import { UsersModule } from './users/users.module';
import { ScreensModule } from './screens/screens.module';
import { ApiModule } from './paypal/paypal.module';
import { OrdersModule } from './orders/orders.module';

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
    MovieModule,
    AuthModule,
    ScheduleModule,
    BookingModule,
    TheatersModule,
    PaymentsModule,
    ScreensModule,
    ApiModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
