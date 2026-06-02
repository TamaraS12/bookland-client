import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../model/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'http://localhost:8080/api/authors';
  private http = inject(HttpClient);

  getAllAuthors() {
    return this.http.get<Author[]>(this.apiUrl);
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  add(author: Author) {
    return this.http.post<Author>(this.apiUrl, author);
  }

  update(id: number, author: Author) {
    return this.http.put<Author>(this.apiUrl + '/' + id, author);
  }
}
