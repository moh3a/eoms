import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IOrder, OrderStatus, orderStatus } from './order.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto implements IOrder {
  @ApiProperty({ enum: orderStatus, example: 'Pending' })
  status: OrderStatus;

  @ApiProperty({ example: 'The order title' })
  @IsNotEmpty({ message: 'Title cannot be empty.' })
  title: string;

  @ApiProperty({ example: 'The order Description' })
  @IsString()
  description: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  price: number;
}
