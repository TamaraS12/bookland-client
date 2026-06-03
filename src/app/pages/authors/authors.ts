import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthorService } from '../../services/author-service';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Author } from '../../model/author.model';
import { AuthorForm } from '../author-form/author-form';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-authors',
  imports: [CommonModule, CardModule, AvatarModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './authors.html',
  styleUrl: './authors.css',
  providers: [DialogService, ConfirmationService],
})
export class Authors implements OnInit {
  private authorService = inject(AuthorService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  ref?: DynamicDialogRef | null;

  authors = signal<Author[]>([]);

  ngOnInit(): void {
    this.loadAuthors();
  }

  addAuthor(): void {
    this.ref = this.dialogService.open(AuthorForm, {
      header: 'Add Author',
      width: '450px',
    });

    this.ref?.onClose.subscribe((result) => {
      if (!result) {
        return;
      }

      this.authorService.add(result).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Author added successfully.',
        });
        this.loadAuthors();
      });
    });
  }

  loadAuthors() {
    this.authorService.getAllAuthors().subscribe((authors) => this.authors.set(authors));
  }

  editAuthor(author: Author): void {
    this.ref = this.dialogService.open(AuthorForm, {
      header: 'Edit Author',
      width: '450px',
      data: {
        author,
      },
    });

    this.ref?.onClose.subscribe((result) => {
      if (!result) {
        return;
      }

      this.authorService.update(author.id, result).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Author edited successfully.',
        });
        this.loadAuthors();
      });
    });
  }

  deleteAuthor(id: number): void {
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
        this.authorService.delete(id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Author deleted successfully.',
          });
          this.loadAuthors();
        });
      },
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
}
