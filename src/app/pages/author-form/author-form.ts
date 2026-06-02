import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './author-form.html',
  styleUrls: ['./author-form.css']
})
export class AuthorForm implements OnInit {

  private fb = inject(FormBuilder);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);

  form = this.fb.group({
    name: ['', Validators.required]
  });

  ngOnInit(): void {
    const author = this.config.data?.author;

    if (author) {
      this.form.patchValue({
        name: author.name
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
