import { Component, inject, OnInit, signal } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GenreService } from '../../services/genre-service';
import { Genre } from '../../model/genre.model';
import { GenreForm } from '../genre-form/genre-form';

@Component({
  selector: 'app-genres',
  imports: [Avatar, Button, Card, ConfirmDialog],
  templateUrl: './genres.html',
  styleUrl: './genres.css',
  providers: [DialogService, ConfirmationService],
})
export class Genres implements OnInit {
  private genreService = inject(GenreService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  ref?: DynamicDialogRef | null;

  genres = signal<Genre[]>([]);

  ngOnInit(): void {
    this.loadGenres();
  }

  addGenre(): void {
    this.ref = this.dialogService.open(GenreForm, {
      header: 'Add Genre',
      width: '450px',
    });

    this.ref?.onClose.subscribe((result) => {
      if (!result) {
        return;
      }

      this.genreService.add(result).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Genre added successfully.',
        });
        this.loadGenres();
      });
    });
  }

  loadGenres() {
    this.genreService.getAllGenres().subscribe((genres) => this.genres.set(genres));
  }

  editGenre(genre: Genre): void {
    this.ref = this.dialogService.open(GenreForm, {
      header: 'Edit Genre',
      width: '450px',
      data: {
        genre,
      },
    });

    this.ref?.onClose.subscribe((result) => {
      if (!result) {
        return;
      }

      this.genreService.update(genre.id, result).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Genre edited successfully.',
        });
        this.loadGenres();
      });
    });
  }

  deleteGenre(id: number): void {
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
        this.genreService.delete(id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Genre deleted successfully.',
          });
          this.loadGenres();
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
