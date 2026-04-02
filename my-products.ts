import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CurrencyYerPipe } from '../../../shared/pipes/currency-yer-pipe';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyYerPipe],
  templateUrl: './my-products.html',
  styleUrl: './my-products.css',
})
export class MyProducts implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  ngOnInit() {
    this.loadMyProducts();
  }

  loadMyProducts() {
    this.productService.getProducts().subscribe({
      next: (prods) => this.products.set(prods),
      error: (err) => console.error('Error loading my products', err)
    });
  }

  deleteProduct(id: number) {
    if (confirm('هل أنتِ متأكدة من حذف هذا المنتج؟')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products.update(prods => prods.filter(p => p.id !== id));
        },
        error: (err) => console.error('Error deleting product', err)
      });
    }
  }
}
