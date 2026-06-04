import { Component, inject, OnInit, signal } from '@angular/core';
import { IMAGE_URL } from '../../constants/image.constants';
import { Author } from '../../model/author.model';
import { Genre } from '../../model/genre.model';
import { BookService } from '../../services/book-service';
import { AuthorService } from '../../services/author-service';
import { GenreService } from '../../services/genre-service';
import { BookSearchRequest } from '../../model/book-search-request.model';
import { DataView, DataViewLazyLoadEvent } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { BookSearchResponse } from '../../model/book-search-response.model';
import { InputText } from 'primeng/inputtext';
import { Select, SelectChangeEvent } from 'primeng/select';
import { Book } from '../../model/book.model';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-shop',
  imports: [DataView, FormsModule, Button, DecimalPipe, InputText, Select, Card],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  apiBaseUrl = IMAGE_URL;

  bookSearchResponse = signal<BookSearchResponse>({
    content: [],
    page: 0,
    size: 0,
    totalElements: 0,
  });
  authors = signal<Author[]>([]);
  genres = signal<Genre[]>([]);

  filters: BookSearchRequest = {
    sort: 'price,asc',
    page: 0,
    size: 8,
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

  resetFilters(): void {
    this.filters = {
      sort: 'price,asc',
    };

    this.loadBooks();
  }

  handleLoad($event: DataViewLazyLoadEvent) {
    this.filters = {
      ...this.filters,
      page: $event.first / $event.rows,
      size: $event.rows,
    };
    this.loadBooks();
  }

  handleBookDetails(book: Book) {
    this.router.navigate(['shop', book.id]);
  }
}
