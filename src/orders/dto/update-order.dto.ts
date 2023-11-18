import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Order } from '@prisma/client';

import { OrderStatus, orderStatus } from './order';

export class UpdateOrderDto implements Partial<Order> {
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
