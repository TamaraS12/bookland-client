import {computed, Injectable, signal} from '@angular/core';
import {Cart, CartItem} from "../model/cart.model";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Cart>({
    items: [],
    totalAmount: 0
  });

  cartSize = computed(() => this.cart().items.length);

  addCartItem(cartItem: CartItem) {
    this.cart.update(cart => ({
      items: [...cart.items, cartItem],
      totalAmount: cart.totalAmount + cartItem.amount
    }));
  }

  deleteCartItem(cartItem: CartItem) {
    this.cart.update(cart => {
      const items = cart.items.filter(item => item.id !== cartItem.id);

      return {
        items: items,
        totalAmount: cart.totalAmount - cartItem.amount
      }
    });
  }

  resetCart(): void {
    this.cart.set({
      items: [],
      totalAmount: 0
    });
  }
}
