import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../model/author.model";

@Injectable({
    providedIn: 'root',
})
export class AuthorService {
    private apiUrl = 'http://localhost:8080/api/authors';
    private http = inject(HttpClient);

    getAllAuthors() {
        return this.http.get<Author[]>(this.apiUrl);
    }

}
