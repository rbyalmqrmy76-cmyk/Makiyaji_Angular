import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  fullName = signal('');
  email = signal('');
  username = signal('');
  password = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  onSubmit() {
    if (!this.fullName() || !this.email() || !this.username() || !this.password()) {
      this.errorMessage.set('يرجى تعبئة كافة الحقول المطلوبة');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const registerData = {
      fullName: this.fullName(),
      email: this.email(),
      username: this.username(),
      pass: this.password()
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.isLoading.set(false);
        alert('تم إنشاء الحساب بنجاح! شكراً لأنضمامكِ لنا.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Registration error', err);
        this.errorMessage.set(err.error?.message || 'حدث خطأ أثناء إنشاء الحساب. تأكد من البيانات.');
      }
    });
  }
}
