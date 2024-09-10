import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import mongoose from 'mongoose';
import { Public } from 'src/decorator/customize';
import { CreateScheduleDto } from 'src/schedules/dto/create-schedule.dto';
import { PaypalService } from './paypal.service';

interface ISeat {
  _id: mongoose.ObjectId;
  label: string;
  status: string;
}

interface ICart {
  amount: string;
  selectedSeats: ISeat[];
  schedule: CreateScheduleDto;
}

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Public()
  @Post('orders')
  async createOrder(@Body('cart') cart: ICart, @Res() res: Response) {
    try {
      const { jsonResponse, status } =
        await this.paypalService.createOrder(cart);
      res.status(status).json(jsonResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create order.' });
    }
  }

  @Public()
  @Post('orders/capture')
  async captureOrder(@Body('orderID') orderID: string, @Res() res: Response) {
    try {
      const { jsonResponse, status } =
        await this.paypalService.captureOrder(orderID);
      res.status(status).json(jsonResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to capture order.' });
    }
  }
}
