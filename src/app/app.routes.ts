import { Routes } from '@angular/router';
import { BooksPage } from './pages/books/books';
import { Authors } from './pages/authors/authors';
import { Genres } from './pages/genres/genres';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { authGuard } from './guard/auth-guard';
import { BookForm } from './pages/book-form/book-form';
import { Register } from './pages/register/register';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full',
      },
      {
        path: 'books',
        component: BooksPage,
        canActivate: [authGuard],
      },
      {
        path: 'books/new',
        component: BookForm,
        canActivate: [authGuard],
      },
      {
        path: 'books/edit/:id',
        component: BookForm,
        canActivate: [authGuard],
      },
      {
        path: 'authors',
        component: Authors,
        canActivate: [authGuard]
      },
      {
        path: 'genres',
        component: Genres,
        canActivate: [authGuard],
      },
      {
        path: 'shop',
        component: Shop,
        canActivate: [authGuard],
      },
    ],
  },
];
