import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb';
import { StarRating } from '../../shared/components/star-rating/star-rating';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { CurrencyYerPipe } from '../../shared/pipes/currency-yer-pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, Breadcrumb, StarRating, CurrencyYerPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<Product | null>(null);
  quantity = signal(1);

  breadcrumbList: BreadcrumbItem[] = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(Number(id));
    }
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.updateBreadcrumbs();
      },
      error: (err) => {
        console.error('Error loading product', err);
      }
    });
  }

  updateBreadcrumbs() {
    this.breadcrumbList = [
      { label: 'المنتجات', url: '/products' },
      { label: this.product()?.name || 'تفاصيل المنتج', url: '', isLast: true }
    ];
  }

  updateQty(change: number) {
    this.quantity.update(q => Math.max(1, q + change));
  }

  addToCart() {
    if (this.product()) {
      this.cartService.addToCart(this.product()!.id, this.quantity()).subscribe({
        next: () => {
          alert('تمت الإضافة للسلة بنجاح!');
        },
        error: (err) => {
          console.error('Error adding to cart', err);
          alert('حدث خطأ أثناء إضافة المنتج للسلة.');
        }
      });
    }
  }
}
