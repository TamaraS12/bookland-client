import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthRequest} from "../model/auth-request.model";
import {AuthResponse} from "../model/auth-response.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private http = inject(HttpClient);

  register(request: AuthRequest) {
    return this.http.post<AuthResponse>(this.apiUrl + '/register', request);
  }

  login(request: AuthRequest) {
    return this.http.post<AuthResponse>(this.apiUrl + '/login', request);
  }
}
