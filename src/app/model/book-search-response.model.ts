import { Book } from './book.model';

export interface BookSearchResponse {
  content: Book[];
  page: number;
  size: number;
  totalElements: number;
}
