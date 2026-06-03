import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../model/order.model";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';
  private http = inject(HttpClient);

  add(order: Order){
    return this.http.post<Order>(this.apiUrl, order);
  }

  getAll() {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
