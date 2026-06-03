import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  imports: [Button, Menu, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
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
}
