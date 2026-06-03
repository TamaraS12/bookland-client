import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../../model/order.model';
import { CartService } from '../../services/cart-service';
import { OrderService } from '../../services/order-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-form',
  imports: [Button, InputText, ReactiveFormsModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderForm {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private messageService = inject(MessageService);

  form = this.formBuilder.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
  });

  save(): void {
    const order: Order = {
      country: this.form.get('country')?.value as string,
      city: this.form.get('city')?.value as string,
      address: this.form.get('address')?.value as string,
      totalAmount: this.cartService.cart().totalAmount,
      items: this.cartService.cart().items.map((item) => {
        return {
          amount: item.amount,
          bookId: item.book.id,
          quantity: item.quantity,
        };
      }),
    };
    this.orderService.add(order).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order created successfully.',
      });
      this.cartService.resetCart();
      this.router.navigate(['shop']);
    });
  }

  cancel(): void {
    this.router.navigate(['cart']);
  }
}
