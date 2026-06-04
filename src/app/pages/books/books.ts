import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

import { Author } from '../../model/author.model';
import { Genre } from '../../model/genre.model';
import { BookSearchRequest } from '../../model/book-search-request.model';

import { BookService } from '../../services/book-service';
import { AuthorService } from '../../services/author-service';
import { GenreService } from '../../services/genre-service';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IMAGE_URL } from '../../constants/image.constants';
import { BookSearchResponse } from '../../model/book-search-response.model';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.html',
  styleUrls: ['./books.css'],
  providers: [ConfirmationService],

  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    ConfirmDialogModule,
    Card,
  ],
})
export class BooksPage implements OnInit {
  apiBaseUrl = IMAGE_URL;

  bookSearchResponse = signal<BookSearchResponse>({
    content: [],
    page: 0,
    size: 8,
    totalElements: 0,
  });
  authors = signal<Author[]>([]);
  genres = signal<Genre[]>([]);

  filters: BookSearchRequest = {
    page: 0,
    size: 8,
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
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.loadAuthors();
    this.loadGenres();
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.searchBooks(this.filters).subscribe((res) => {
      this.bookSearchResponse.set(res);
    });
  }

  loadAuthors(): void {
    this.authorService.getAllAuthors().subscribe((res) => this.authors.set(res));
  }

  loadGenres(): void {
    this.genreService.getAllGenres().subscribe((res) => this.genres.set(res));
  }

  handleSortChange($event: SelectChangeEvent): void {
    this.filters = {
      ...this.filters,
      sort: $event.value,
    };
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
      sort: 'price,asc',
    };
    this.loadBooks();
  }

  handleLoad($event: TableLazyLoadEvent) {
    this.filters = {
      ...this.filters,
      page: ($event.first ?? 0) / ($event.rows ?? 0),
      size: $event.rows ?? 0,
    };
    this.loadBooks();
  }
}
