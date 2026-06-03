import { Component, OnInit, signal } from '@angular/core';
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
import { FileUpload } from 'primeng/fileupload';
import { IMAGE_URL } from '../../constants/image.constants';


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
    ReactiveFormsModule,
    ToastModule,
    FileUpload,
  ],
})
export class BookForm implements OnInit {
  apiBaseUrl = IMAGE_URL;

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
    authorId: null,
    genreIds: [],
  });

  selectedFile: File | null = null;
  imagePreview = signal<string | null>(null);

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

      this.imagePreview.set(this.apiBaseUrl + this.book.imageName);
    });
  }

  save(): void {
    if (this.isEditMode) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }

  onFileSelect(event: any): void {
    this.selectedFile = event.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };

    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  private addBook() {
    const formData = new FormData();

    formData.append(
      'book',
      new Blob([JSON.stringify(this.form.getRawValue())], { type: 'application/json' }),
    );

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.bookService.createBook(formData).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Book added successfully.',
      });
      this.router.navigate(['/books']);
    });
  }

  private updateBook() {
    const updatedBook: Book = {
      ...(this.form.getRawValue() as Book),
      id: this.book?.id,
    };
    const formData = new FormData();

    formData.append(
      'book',
      new Blob(
        [JSON.stringify(updatedBook)],
        { type: 'application/json' }),
    );

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.book?.id) {
      this.bookService.updateBook(this.book.id, formData).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Book updated successfully.',
        });
        this.router.navigate(['/books']);
      });
    }
  }
}
