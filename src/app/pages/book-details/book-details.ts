import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book-service';
import { Book } from '../../model/book.model';
import { Card } from 'primeng/card';
import { IMAGE_URL } from '../../constants/image.constants';
import { DecimalPipe } from '@angular/common';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItem } from '../../model/cart.model';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-book-details',
  imports: [Card, DecimalPipe, InputNumber, Button, ReactiveFormsModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails implements OnInit {
  apiBaseUrl = IMAGE_URL;

  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  private formBuilder = inject(FormBuilder);
  private cartService = inject(CartService);
  private router = inject(Router);

  book = signal<Book | null>(null);
  cartSize = this.cartService.cartSize;

  form = this.formBuilder.group({
    quantity: [0, [Validators.required, Validators.min(1)]],
  });

  cartItem: CartItem | undefined;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('bookId');
    if (id) {
      this.bookService.getById(Number(id)).subscribe((res) => {
        this.book.set(res);
      });
    }
  }

  handleCartItemClicked() {
    if (this.cartItem) {
      this.editCartItem();
    } else {
      this.addCartItem();
    }
  }

  private addCartItem(): void {
    if (this.book) {
      const quantity: number = this.form.get('quantity')?.value as number;
      const cartItem: CartItem = {
        id: this.cartSize() + 1,
        book: this.book()!,
        quantity: quantity,
        amount: this.book()?.price! * quantity,
      };
      this.cartService.addCartItem(cartItem);
      this.router.navigate(['cart']);
    }
  }

  private editCartItem() {
    if (this.book && this.cartItem) {
      const quantity: number = this.form.get('quantity')?.value as number;
      const updatedCartItem: CartItem = {
        ...this.cartItem,
        quantity: quantity,
        amount: this.book()?.price! * quantity,
      };
      this.cartService.updateCartItem(updatedCartItem);
      this.router.navigate(['cart']);
    }
  }
}
