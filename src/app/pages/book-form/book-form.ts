import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { Book } from '../../model/book.model';
import { BookService } from '../../services/book-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { Router } from '@angular/router';

import { Author } from '../../model/author.model';
import { Genre } from '../../model/genre.model';
import { AuthorService } from '../../services/author-service';
import { GenreService } from '../../services/genre-service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    SelectModule,
    MultiSelectModule,
    ButtonModule,
  ],
})
export class BookForm implements OnInit {
  apiBaseUrl = 'http://localhost:8080';

  authors: Author[] = [];
  genres: Genre[] = [];
  book: Book = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
  };

  isEditMode = false;
  bookId?: number;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private genreService = inject(GenreService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadAuthors();
    this.loadGenres();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.bookId = Number(id);

      this.loadBook(this.bookId);
    }
  }

  loadBook(id: number): void {
    this.bookService.getById(id).subscribe((res) => {
      this.book = res;
    });
  }

  loadAuthors(): void {
    this.authorService.getAllAuthors().subscribe(res => {
      this.authors = res;
      this.cdr.detectChanges();
    });
  }

  loadGenres(): void {
    this.genreService.getAllGenres().subscribe((res) => (this.genres = res));
  }

  save(): void {
    if (this.isEditMode) {
      this.bookService.updateBook(this.bookId!, this.book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.createBook(this.book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }
}
