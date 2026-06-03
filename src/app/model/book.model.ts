export interface Book {
  id?: number;
  title: string;
  price: number;
  description: string;
  imageName?: string | null;
  authorName?: string;
  authorId?: number | null;
  genres?: string[];
  genreIds?: number[];
}
