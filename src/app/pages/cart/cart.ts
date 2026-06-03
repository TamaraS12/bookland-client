import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { CartItem } from '../../model/cart.model';
import { IMAGE_URL } from '../../constants/image.constants';
import { TableModule } from 'primeng/table';
import { DecimalPipe } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-cart',
  imports: [TableModule, DecimalPipe, Button],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  apiBaseUrl = IMAGE_URL;
  private cartService = inject(CartService);
  private router = inject(Router);

  cart = this.cartService.cart;

  totalAmount = computed(() => this.cart().totalAmount);

  constructor() {}

  ngOnInit() {}

  handleEdit(item: CartItem) {
    this.router.navigate(['books', item.book.id, 'cart', 'items', item.id]);
  }

  handleDelete(item: CartItem) {
    this.cartService.deleteCartItem(item);
  }

  handleOrder() {
    this.router.navigate(['order']);
  }

  clearCart() {
    this.cartService.resetCart();
  }
}
