import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IOrder } from '../order';

@Entity({ name: 'orders' })
export class Order implements IOrder {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public title: string;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: 'Pending' })
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delievered';
}
