import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  onSubmit() {
    if (!this.email() || !this.password()) {
      this.errorMessage.set('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login({ email: this.email(), pass: this.password() }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Login error', err);
        this.errorMessage.set(err.error?.message || 'فشل تسجيل الدخول. يرجى التأكد من البيانات.');
      }
    });
  }
}
