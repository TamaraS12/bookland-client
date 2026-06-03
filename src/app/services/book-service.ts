import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../model/book.model";
import { BookSearchResponse } from '../model/book-search-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';
  private http = inject(HttpClient);

  searchBooks(params: any) {
    return this.http.get<BookSearchResponse>(this.apiUrl + '/search', { params });
  }

  getById(id: number){
    return this.http.get<Book>(this.apiUrl + '/' + id);
  }
  createBook(formData: FormData) {
    return this.http.post<Book>(this.apiUrl, formData);
  }

  updateBook(id: number, formData: FormData) {
    return this.http.put<Book>(this.apiUrl + '/' + id, formData);
  }

  deleteBook(id: number) {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
}
