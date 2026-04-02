import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CurrencyYerPipe } from '../../shared/pipes/currency-yer-pipe';
import { Breadcrumb, BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyYerPipe, Breadcrumb],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  public cartService = inject(CartService);

  breadcrumbList: BreadcrumbItem[] = [
    { label: 'سلة المشتريات', url: '/cart', isLast: true }
  ];

  updateQuantity(id: number, change: number) {
    this.cartService.updateQuantity(id, change);
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }
}
