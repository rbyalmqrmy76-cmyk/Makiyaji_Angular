import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  categories = signal<Category[]>([]);
  isLoading = signal(true);

  product = {
    id: 0,
    name: '',
    categoryId: 0,
    brand: '',
    price: 0,
    discountPrice: null as number | null,
    stockQuantity: 0,
    description: '',
    mainImage: ''
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadCategories();
    if (id) {
      this.loadProduct(Number(id));
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(cats => this.categories.set(cats));
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (prod: Product) => {
        this.product = {
          id: prod.id,
          name: prod.name,
          categoryId: prod.categoryId,
          brand: prod.brand || '',
          price: prod.price,
          discountPrice: prod.discountPrice || null,
          stockQuantity: prod.stockQuantity,
          description: prod.description || '',
          mainImage: prod.images[0] || ''
        };
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading product', err);
        alert('حدث خطأ أثناء تحميل بيانات المنتج');
        this.router.navigate(['/dashboard/my-products']);
      }
    });
  }

  updateProduct() {
    if (!this.product.name || !this.product.price || !this.product.categoryId) {
      alert('يرجى إكمال بيانات المنتج!');
      return;
    }

    const payload = {
      ...this.product,
      images: this.product.mainImage ? [this.product.mainImage] : []
    };

    this.productService.updateProduct(this.product.id, payload).subscribe({
      next: () => {
        alert('تم تحديث المنتج بنجاح!');
        this.router.navigate(['/dashboard/my-products']);
      },
      error: (err) => {
        console.error('Error updating product', err);
        alert('حدث خطأ أثناء التحديث');
      }
    });
  }
}
