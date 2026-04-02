import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        // Auto logout if 401 response returned from api
        authService.logout();
        router.navigate(['/auth/login']);
      }

      const error = err.error?.message || err.statusText;
      console.error('Mkiajy API Error:', error);
      return throwError(() => error);
    })
  );
};
