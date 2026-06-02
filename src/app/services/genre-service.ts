import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Genre} from "../model/genre.model";

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private apiUrl = 'http://localhost:8080/api/genres';
  private http = inject(HttpClient);

  getAllGenres() {
    return this.http.get<Genre[]>(this.apiUrl);
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  add(genre: Genre) {
    return this.http.post<Genre>(this.apiUrl, genre);
  }

  update(id: number, genre: Genre) {
    return this.http.put<Genre>(this.apiUrl + '/' + id, genre);
  }
}
