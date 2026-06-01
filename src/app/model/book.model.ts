export interface Book {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  authorName?: string;
  authorId?: number;
  genres?: string[];
  genreIds?: number[];
}
