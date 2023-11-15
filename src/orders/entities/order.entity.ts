import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IOrder, OrderStatus } from '../order';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'orders' })
export class Order implements IOrder {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => User, (user) => user.orders)
  public userId: number;

  @Column({ unique: true })
  public title: string;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: 'Pending' })
  status: OrderStatus;
}
