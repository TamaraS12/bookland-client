import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { Book } from '../../model/book.model';
import { BookService } from '../../services/book-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { Router } from '@angular/router';

import { AuthorService } from '../../services/author-service';
import { GenreService } from '../../services/genre-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    SelectModule,
    MultiSelectModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,

  ],
})
export class BookForm implements OnInit {
  apiBaseUrl = 'http://localhost:8080';

  isEditMode = false;
  book: Book | undefined;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private genreService = inject(GenreService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);


  form = this.formBuilder.group<Book>({
    title: '',
    description: '',
    price: 0,
    imageUrl: null,
    authorId: null,
    genreIds: []
  });

  authors = toSignal(this.authorService.getAllAuthors(), { initialValue: [] });

  genres = toSignal(this.genreService.getAllGenres(), { initialValue: [] });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      const bookId = Number(id);

      this.loadBook(bookId);
    }
  }

  loadBook(id: number): void {
    this.bookService.getById(id).subscribe((res) => {
      this.book = res;
      this.form.patchValue(this.book);
    });
  }

  save(): void {
    console.log(this.form.getRawValue());

    if (this.isEditMode) {
      const updatedBook: Book = {
        ...this.form.getRawValue() as Book,
        id: this.book?.id
      }
      if (this.book?.id) {
        this.bookService.updateBook(this.book.id, updatedBook).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Book updated successfully.',
          });
          this.router.navigate(['/books']);
        });
      }
    } else {
      const newBook = this.form.getRawValue() as Book;
      this.bookService.createBook(newBook).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Book added successfully.',
        });
        this.router.navigate(['/books']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }
}
