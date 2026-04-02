import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { CurrencyYerPipe } from '../../shared/pipes/currency-yer-pipe';
import { Breadcrumb, BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CurrencyYerPipe, Breadcrumb],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  public cartService = inject(CartService);
  private router = inject(Router);

  breadcrumbList: BreadcrumbItem[] = [
    { label: 'سلة المشتريات', url: '/cart' },
    { label: 'إتمام الطلب', url: '/checkout', isLast: true }
  ];

  shippingInfo = {
    fullName: '',
    phone: '',
    city: 'التربة',
    address: '',
    notes: ''
  };

  isProcessing = signal(false);

  placeOrder() {
    if (!this.shippingInfo.fullName || !this.shippingInfo.phone || !this.shippingInfo.address) {
      alert('يرجى إكمال بيانات الشحن أولاً!');
      return;
    }

    this.isProcessing.set(true);
    
    // Mock API call
    setTimeout(() => {
      this.isProcessing.set(false);
      alert('تم استلام طلبكِ بنجاح! شكراً للتسوق من مكياجي.');
      this.cartService.clearCart();
      this.router.navigate(['/']);
    }, 2000);
  }
}
