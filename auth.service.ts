import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AuthResponse {
  id: number;
  fullName: string;
  email: string;
  username: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  
  currentUser = signal<User | null>(null);

  isLoggedIn = computed(() => !!this.currentUser());
  isAdmin = computed(() => ['admin', 'Admin'].includes(this.currentUser()?.role as string));

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('mkiajy_user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  login(credentials: { email: string; pass: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
      email: credentials.email,
      password: credentials.pass
    }).pipe(
      tap(res => {
        const user: User = {
          id: res.id.toString(),
          email: res.email,
          fullName: res.fullName,
          role: res.role as any,
          token: res.token
        };
        this.currentUser.set(user);
        localStorage.setItem('mkiajy_user', JSON.stringify(user));
      })
    );
  }

  register(data: { fullName: string; email: string; username: string; pass: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      fullName: data.fullName,
      email: data.email,
      username: data.username,
      password: data.pass
    }).pipe(
      tap(res => {
        const user: User = {
          id: res.id.toString(),
          email: res.email,
          fullName: res.fullName,
          role: res.role as any,
          token: res.token
        };
        this.currentUser.set(user);
        localStorage.setItem('mkiajy_user', JSON.stringify(user));
      })
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, data);
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('mkiajy_user');
  }

  getToken(): string | null {
    const user = this.currentUser();
    return user ? user.token || null : null;
  }
}
