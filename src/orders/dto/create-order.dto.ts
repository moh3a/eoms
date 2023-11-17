import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IOrder, OrderStatus } from './order.type';

export class CreateOrderDto implements IOrder {
  status: OrderStatus;

  @IsNotEmpty({ message: 'Title cannot be empty.' })
  title: string;

  // @IsDate()
  // createdAt: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
