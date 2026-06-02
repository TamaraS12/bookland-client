import { Component, inject, OnInit } from '@angular/core';
import { ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

import { Book } from '../../model/book.model';
import { Author } from '../../model/author.model';
import { Genre } from '../../model/genre.model';
import { BookFilterParams } from '../../model/book-filter-params.model';

import { BookService } from '../../services/book-service';
import { AuthorService } from '../../services/author-service';
import { GenreService } from '../../services/genre-service';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService  } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.html',
  styleUrls: ['./books.css'],
  providers: [ConfirmationService, MessageService],

  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    ConfirmDialogModule,
    ToastModule,

  ],
})
export class BooksPage implements OnInit {
  apiBaseUrl = 'http://localhost:8080';

  books: Book[] = [];
  authors: Author[] = [];
  genres: Genre[] = [];

  filters: any = {
    authorId: null,
    genreId: null,
    title: null,
    sort: 'price,asc',
  };

  sortOptions = [
    {
      label: 'Price ↑',
      value: 'price,asc',
    },
    {
      label: 'Price ↓',
      value: 'price,desc',
    },
  ];

  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private genreService = inject(GenreService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.loadAuthors();
    this.loadGenres();
    this.loadBooks();
  }

  loadBooks(): void {
    const params: BookFilterParams = {};

    if (this.filters.title) {
      params.title = this.filters.title;
    }

    if (this.filters.authorId) {
      params.authorId = this.filters.authorId;
    }

    if (this.filters.genreId) {
      params.genreId = this.filters.genreId;
    }

    if (this.filters.sort) {
      params.sort = this.filters.sort;
    }

    this.bookService.searchBooks(params).subscribe(res => {
      this.books = res;
      this.cdr.detectChanges();
    });
  }

  loadAuthors(): void {
    this.authorService.getAllAuthors().subscribe((res) => (this.authors = res));
  }

  loadGenres(): void {
    this.genreService.getAllGenres().subscribe((res) => (this.genres = res));
  }

  handleSortChange(): void {
    this.loadBooks();
  }

  addBook(): void {
    this.router.navigate(['/books/new']);
  }

  editBook(id: number): void {
    this.router.navigate(['/books/edit', id]);
  }

  deleteBook(id: number) {
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
        this.bookService.deleteBook(id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Book deleted successfully.',
          });
          this.loadBooks();
        });
      },
    });
  }

  resetFilters(): void {
    this.filters = {
      authorId: null,
      genreId: null,
      title: null,
      sort: 'price,asc',
    };

    this.loadBooks();
  }
}
