import {Book} from "./book.model";

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

export interface CartItem {
  id: number;
  book: Book;
  quantity: number;
  amount: number;
}
