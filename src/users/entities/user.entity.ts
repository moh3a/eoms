import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../user';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column()
  public password: string;

  @OneToMany(() => Order, (order) => order.userId)
  public orders: Order[];
}
