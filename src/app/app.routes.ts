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
  },
  {
    path: 'books/new',
    loadComponent: () =>
      import('./pages/book-form/book-form')
        .then(m => m.BookForm)
  },
  {
    path: 'books/edit/:id',
    loadComponent: () =>
      import('./pages/book-form/book-form')
        .then(m => m.BookForm)
  }
];
