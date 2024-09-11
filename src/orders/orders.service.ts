import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(orderData: CreateOrderDto) {
    const order = new this.orderModel({
      ...orderData,
      lastModifiedDate: new Date(),
      pending: true, // Initially, the order is pending
    });

    return order.save();
  }

  async completeOrder(orderId: string) {
    const order = await this.orderModel.findById(orderId);

    if (!order) throw new Error('Order not found');

    if (order.pending === false) {
      // Handle case where the order is already completed
      throw new Error('Order has already been processed');
    }

    // Mark as no longer pending (so TTL won't apply)
    order.pending = false;
    await order.save();

    // Unlock seats or proceed to checkout
    // Your seat unlock logic can be placed here
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
