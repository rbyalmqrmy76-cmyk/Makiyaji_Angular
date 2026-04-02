import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/reviews`;

  getProductReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/product/${productId}`);
  }

  addReview(reviewDto: { productId: number; rating: number; comment: string }): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, reviewDto);
  }
}
