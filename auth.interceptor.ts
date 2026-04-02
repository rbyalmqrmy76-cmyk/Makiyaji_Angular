import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const user = authService.currentUser();

  if (user && user.token) {
    // Clone request and add Bearer token
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }

  return next(req);
};
