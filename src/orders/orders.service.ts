import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Order } from "@prisma/client";

import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { orderStatus } from "./dto/order";
import { PrismaService } from "src/prisma.service";
import { DEFAULT_PAGE_SIZE } from "src/constants";

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private db: PrismaService) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    return await this.db.order.create({ data: { ...createOrderDto, userId } });
  }

  async findAll(skip?: number, take?: number): Promise<Order[]> {
    const orders = await this.db.order.findMany({
      skip: skip && !isNaN(skip) ? skip : 0,
      take: take && !isNaN(take) ? take : DEFAULT_PAGE_SIZE,
    });
    if (orders) {
      return orders;
    }
    throw new HttpException("Order not found", HttpStatus.NOT_FOUND);
  }

  async findOne(id: number): Promise<Order | null> {
    const order = await this.db.order.findUnique({ where: { id } });
    if (order) {
      return order;
    }
    throw new HttpException("Order not found", HttpStatus.NOT_FOUND);
  }

  async update(userId: number, id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.db.order.findUnique({ where: { id, userId } });
    this.canUpdate(order, updateOrderDto);

    if (updateOrderDto.status === "Cancelled")
      updateOrderDto = { status: updateOrderDto.status };

    const updatedOrder = await this.db.order.update({
      where: { id },
      data: updateOrderDto,
    });

    this.logger.log(
      `Order [id: ${id}] status was successfully updated. From ${order?.status} to ${updateOrderDto.status}`,
    );
    return { updatedOrder };
  }

  async remove(userId: number, id: number) {
    const orderDeleted = await this.db.order.delete({ where: { id, userId } });
    if (orderDeleted) {
      return HttpStatus.OK;
    }
    throw new HttpException("Order not found", HttpStatus.NOT_FOUND);
  }

  canUpdate(order: Order | null, updateOrderDto: UpdateOrderDto) {
    if (!order) {
      throw new HttpException("Order not found", HttpStatus.NOT_FOUND);
    } else if (
      order.status === "Pending" &&
      updateOrderDto.status !== "Processing" &&
      updateOrderDto.status !== "Cancelled"
    ) {
      throw new HttpException(
        `Cannot update order that is pending.`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (
      order.status !== "Pending" &&
      updateOrderDto.status === "Cancelled"
    ) {
      throw new HttpException(
        `Cannot cancel order that is not pending.`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (order.status === "Cancelled") {
      throw new HttpException(
        `Cannot update order that is cancelled.`,
        HttpStatus.BAD_REQUEST,
      );
    } else return this.isWorkflowForward(order, updateOrderDto);
  }

  isWorkflowForward(order: Order, updateOrderDto: UpdateOrderDto) {
    const orderStatusIndex = orderStatus.findIndex((o) => o === order.status);
    const updatedOrderStatusIndex = updateOrderDto.status
      ? orderStatus.findIndex((o) => o === updateOrderDto.status)
      : orderStatusIndex;

    if (!updateOrderDto.status) return true;
    else if (
      orderStatusIndex === updatedOrderStatusIndex - 1 &&
      orderStatusIndex < orderStatus.length - 2
    ) {
      return true;
    } else
      throw new HttpException(
        `Cannot update status from ${order.status} to ${updateOrderDto.status}`,
        HttpStatus.BAD_REQUEST,
      );
  }
}
