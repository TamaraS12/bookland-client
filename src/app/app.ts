import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Button],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('bookland-client');

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
