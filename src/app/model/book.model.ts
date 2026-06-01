export interface Book {
  id?: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string | null;
  authorName?: string;
  authorId?: number | null;
  genres?: string[];
  genreIds?: number[];
}
