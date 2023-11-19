import { ApiProperty } from "@nestjs/swagger";
import { Order } from "@prisma/client";

import { OrderStatus, orderStatus } from "./order";

export class UpdateOrderDto implements Partial<Order> {
  @ApiProperty({ enum: orderStatus, example: "Pending" })
  status?: OrderStatus;

  @ApiProperty({ example: "The order title" })
  title?: string;

  @ApiProperty({ example: "The order Description" })
  description?: string;

  @ApiProperty({ example: 100 })
  price?: number;
}
