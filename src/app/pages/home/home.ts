import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MenuItem } from '../../model/menu-item.model';
import { UserRole } from '../../model/auth-response.model';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);

  cartSize = this.cartService.cartSize;
  username = localStorage.getItem('username');
  userRole = localStorage.getItem('role') as UserRole;

  items: MenuItem[] = [];

  ngOnInit() {
    if (this.userRole === UserRole.ADMIN) {
      this.items = this.getAdminItems();
    } else {
      this.items = this.getUserItems();
    }
  }

  handleViewCart() {
    this.router.navigate(['cart']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  private getUserItems() {
    return [
      {
        label: 'Shop',
        icon: 'shopping_bag',
        routerLink: '/shop'
      },
      {
        label: 'Cart',
        icon: 'shopping_cart',
        routerLink: '/cart'
      },
    ];
  }

  private getAdminItems() {
    return [
      {
        label: 'Books',
        icon: 'menu_book',
        routerLink: '/books'
      },
      {
        label: 'Authors',
        icon: 'people',
        routerLink: '/authors'
      },
      {
        label: 'Genres',
        icon: 'category',
        routerLink: '/genres'
      },
    ];
  }

  protected readonly UserRole = UserRole;
}
