import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct implements OnInit {
  private router = inject(Router);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  categories = signal<Category[]>([]);

  product = {
    name: '',
    categoryId: 0,
    brand: '',
    price: 0,
    discountPrice: null as number | null,
    stockQuantity: 10,
    images: [] as string[],
    description: '',
    mainImage: ''
  };

  ngOnInit() {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories.set(cats);
      if (cats.length > 0) this.product.categoryId = cats[0].id;
    });
  }

  saveProduct() {
    if (!this.product.name || !this.product.price || !this.product.categoryId) {
      alert('يرجى إكمال بيانات المنتج الأساسية واختيار التصنيف!');
      return;
    }

    const payload = {
      ...this.product,
      images: this.product.mainImage ? [this.product.mainImage] : []
    };

    this.productService.addProduct(payload).subscribe({
      next: () => {
        alert('تم إضافة المنتج بنجاح!');
        this.router.navigate(['/dashboard/my-products']);
      },
      error: (err) => {
        console.error('Error saving product', err);
        alert('حدث خطأ أثناء حفظ المنتج. يرجى المحاولة مرة أخرى.');
      }
    });
  }
}
