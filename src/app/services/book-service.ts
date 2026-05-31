import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../model/book.model";

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';
  private http = inject(HttpClient);

  searchBooks(params: any) {
    return this.http.get<Book[]>(this.apiUrl + '/search', { params });
  }

  getById(id: number){
    return this.http.get<Book>(this.apiUrl + '/' + id);
  }
}
