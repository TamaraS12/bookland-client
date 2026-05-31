import { Routes } from '@angular/router';
import { BooksPage } from './pages/books/books';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: BooksPage
  }
];
