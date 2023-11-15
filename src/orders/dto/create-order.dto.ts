import { IOrder } from '../order';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto implements IOrder {
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delievered';

  @IsNotEmpty({ message: 'Title cannot be empty.' })
  title: string;

  @IsDate()
  createdAt: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
