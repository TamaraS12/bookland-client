export interface Order {
  id?: number;
  country: string;
  city: string;
  address: string;
  orderDate?: Date;
  totalAmount: number;
  items: OrderItem[];
}

export interface OrderItem {
  id?: number;
  bookId?: number;
  bookTitle?: string;
  quantity: number;
  amount: number;
}
