import { Component, inject } from '@angular/core';
import { Menu } from 'primeng/menu';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-home',
  imports: [Menu, RouterOutlet, OverlayBadgeModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private cartService = inject(CartService);
  private router = inject(Router);

  cartSize = this.cartService.cartSize;

  items: MenuItem[] = [
    {
      label: 'Books',
      icon: 'pi pi-book',
      routerLink: ['/books'],
    },
    {
      label: 'Authors',
      icon: 'pi pi-users',
      routerLink: ['/authors'],
    },
    {
      label: 'Genres',
      icon: 'pi pi-briefcase',
      routerLink: ['/genres'],
    },
  ];

  handleViewCart() {
    this.router.navigate(['cart']);
  }
}
