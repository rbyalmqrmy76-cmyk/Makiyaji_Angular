import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb, BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productService = inject(ProductService);

  searchQuery = signal('');
  selectedCategory = signal('الكل');
  selectedPriceRange = signal(100000); // Max Price

  breadcrumbList: BreadcrumbItem[] = [
    { label: 'المنتجات', url: '/products', isLast: true }
  ];

  categories = ['الكل', 'مكياج الوجه', 'العناية بالبشرة', 'العطور', 'العناية بالشعر'];
  
  allProducts = signal<Product[]>([]);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts.set(products);
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

  filteredProducts = computed(() => {
    return this.allProducts().filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(this.searchQuery().toLowerCase()) || 
                           (p.brand && p.brand.toLowerCase().includes(this.searchQuery().toLowerCase()));
      const matchesCategory = this.selectedCategory() === 'الكل' || p.categoryName === this.selectedCategory();
      const matchesPrice = (p.discountPrice || p.price) <= this.selectedPriceRange();
      return matchesSearch && matchesCategory && matchesPrice;
    });
  });

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }
}
