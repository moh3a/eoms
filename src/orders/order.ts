type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delievered';

export interface IOrder {
  status: OrderStatus;
  title: string;
  description: string;
  price: number;
  createdAt: string;
}
