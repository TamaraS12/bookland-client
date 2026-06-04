import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { Order } from '../../model/order.model';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { DatePipe, DecimalPipe } from '@angular/common';
import { UserRole } from '../../model/auth-response.model';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-orders',
  imports: [TableModule, Button, Ripple, DatePipe, DecimalPipe, Card],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);

  userRole: UserRole = localStorage.getItem('role') as UserRole;

  constructor() {}

  ngOnInit() {
    if (this.userRole === UserRole.ADMIN) {
      this.orderService.getAll().subscribe((res) => this.orders.set(res));
    } else {
      this.orderService.getAllByUser().subscribe((res) => this.orders.set(res));
    }
  }
}
