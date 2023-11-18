export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delievered'
  | 'Cancelled';

export const orderStatus: OrderStatus[] = [
  'Pending',
  'Processing',
  'Shipped',
  'Delievered',
  'Cancelled',
];
