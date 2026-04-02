import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/cart`;

  // Signal state for cart
  items = signal<CartItem[]>([]);

  // Compute total
  totalPrice = () => this.items().reduce((acc, item) => 
    acc + ((item.discountPrice ?? item.price) * item.quantity), 0);

  totalQuantity = () => this.items().reduce((acc, item) => 
    acc + item.quantity, 0);

  loadCart(): void {
    this.http.get<CartItem[]>(this.apiUrl).subscribe(
      items => this.items.set(items)
    );
  }

  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http.post<CartItem>(this.apiUrl, { productId, quantity }).pipe(
      tap(() => this.loadCart())
    );
  }

  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cartItemId}`, quantity).pipe(
      tap(() => this.loadCart())
    );
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartItemId}`).pipe(
      tap(() => this.loadCart())
    );
  }

  clearCart() {
    this.items.set([]);
  }
}
