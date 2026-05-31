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
}
