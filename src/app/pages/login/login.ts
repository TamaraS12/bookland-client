import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { AuthService } from '../../services/auth-service';
import { AuthRequest } from '../../model/auth-request.model';
import { UserRole } from '../../model/auth-response.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputText, Button, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  handleLogin() {
    if (this.form.valid) {
      const request: AuthRequest = {
        username: this.form.value.username as string,
        password: this.form.value.password as string,
      };
      this.authService.login(request).subscribe((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        if (res.role === UserRole.ADMIN) {
          this.router.navigate(['books']);
        } else {
          this.router.navigate(['shop']);
        }
      });
    }
  }
}
