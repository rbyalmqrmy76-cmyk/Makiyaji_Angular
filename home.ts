import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { Product } from '../../core/models/product.model';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  featuredProducts = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  ngOnInit() {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  loadFeaturedProducts() {
    this.productService.getProducts({ sortBy: 'sales' }).subscribe({
      next: (products) => {
        this.featuredProducts.set(products.slice(0, 4)); // Show top 4
      },
      error: (err) => console.error('Error loading featured products', err)
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: (err) => console.error('Error loading categories', err)
    });
  }
}
