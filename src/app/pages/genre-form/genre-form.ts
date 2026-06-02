import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-genre-form',
  imports: [Button, FormsModule, InputText, ReactiveFormsModule],
  templateUrl: './genre-form.html',
  styleUrl: './genre-form.css',
})
export class GenreForm implements OnInit{
  private fb = inject(FormBuilder);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);

  form = this.fb.group({
    name: ['', Validators.required]
  });

  ngOnInit(): void {
    const genre = this.config.data?.genre;

    if (genre) {
      this.form.patchValue({
        name: genre.name
      });
    }
  }

  save(): void {
    this.ref.close(this.form.getRawValue());
  }

  cancel(): void {
    this.ref.close();
  }
}
