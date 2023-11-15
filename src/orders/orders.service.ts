import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from './order';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.ordersRepository.create(createOrderDto);
    await this.ordersRepository.save(newOrder);
    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.ordersRepository.find();
    if (orders) {
      return orders;
    }
    throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number): Promise<Order | null> {
    const order = await this.ordersRepository.findOneBy({ id });
    if (order) {
      return order;
    }
    throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const OrderStatusArray: OrderStatus[] = [
      'Pending',
      'Processing',
      'Shipped',
      'Delievered',
    ];
    const order = await this.ordersRepository.findOneBy({ id });
    const orderStatusIndex = OrderStatusArray.findIndex(
      (o) => o === order.status,
    );
    const updatedOrderStatusIndex = updateOrderDto.status
      ? OrderStatusArray.findIndex((o) => o === updateOrderDto.status)
      : orderStatusIndex;

    if (orderStatusIndex >= updatedOrderStatusIndex - 1) {
      const updatedOrder = await this.ordersRepository.update(
        { id },
        updateOrderDto,
      );
      if (updatedOrder.affected) {
        return { ...order, status: updateOrderDto.status };
      }
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException(
      `Cannot update status from ${order.status} to ${updateOrderDto.status}`,
      HttpStatus.BAD_REQUEST,
    );
  }

  async remove(id: number) {
    const orderDeleted = await this.ordersRepository.delete(id);
    if (orderDeleted.affected) {
      return HttpStatus.OK;
    }
    throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
  }
}
