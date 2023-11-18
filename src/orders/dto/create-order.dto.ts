import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderStatus, orderStatus } from './order';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';

export class CreateOrderDto implements Omit<Order, 'id' | 'createdAt'> {
  @ApiProperty({ enum: orderStatus, example: 'Pending' })
  status: OrderStatus;

  @ApiProperty({ example: 123 })
  userId: number;

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
