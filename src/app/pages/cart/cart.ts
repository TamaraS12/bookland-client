import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { CartItem } from '../../model/cart.model';
import { IMAGE_URL } from '../../constants/image.constants';
import { TableModule } from 'primeng/table';
import { DecimalPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-cart',
  imports: [TableModule, DecimalPipe, Button, ConfirmDialogModule, Card],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  providers: [ConfirmationService],
})
export class Cart {
  apiBaseUrl = IMAGE_URL;
  private cartService = inject(CartService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  cart = this.cartService.cart;

  totalAmount = computed(() => this.cart().totalAmount);

  handleDelete(item: CartItem) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.cartService.deleteCartItem(item);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Cart item deleted successfully.',
        });
      },
    });
  }

  handleOrder() {
    this.router.navigate(['orders', 'new']);
  }

  clearCart() {
    this.confirmationService.confirm({
      message: 'Do you want to clear this cart?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.cartService.resetCart();
      },
    });
  }
}
