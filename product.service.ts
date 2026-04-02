import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

export interface ProductFilter {
  searchTerm?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  onSale?: boolean;
  sortBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  getProducts(filter?: ProductFilter): Observable<Product[]> {
    let params = new HttpParams();
    if (filter) {
      if (filter.searchTerm) params = params.set('searchTerm', filter.searchTerm);
      if (filter.categoryId) params = params.set('categoryId', filter.categoryId.toString());
      if (filter.minPrice) params = params.set('minPrice', filter.minPrice.toString());
      if (filter.maxPrice) params = params.set('maxPrice', filter.maxPrice.toString());
      if (filter.brand) params = params.set('brand', filter.brand);
      if (filter.onSale !== undefined) params = params.set('onSale', filter.onSale.toString());
      if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
    }

    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(productDto: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productDto);
  }

  updateProduct(id: number, productDto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productDto);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  approveProduct(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/approve`, {});
  }
}
