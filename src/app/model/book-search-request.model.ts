export interface BookSearchRequest {
  title?: string;
  authorId?: number;
  genreId?: number;
  sort?: string;
  page?: number;
  size?: number;
}
