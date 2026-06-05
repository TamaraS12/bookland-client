import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { AuthRequest } from '../../model/auth-request.model';
import { UserRole } from '../../model/auth-response.model';

@Component({
  selector: 'app-register',
  imports: [Button, InputText, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  handleRegister() {
    if (this.form.valid) {
      const request: AuthRequest = {
        username: this.form.value.username as string,
        password: this.form.value.password as string
      }
      this.authService.register(request).subscribe(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.role);
        if (res.role === UserRole.ADMIN) {
          this.router.navigate(['books']);
        } else {
          this.router.navigate(['shop']);
        }
      })
    }
  }
}
