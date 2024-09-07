import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';

@Module({
  imports: [HttpModule],
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class ApiModule {}
