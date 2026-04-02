import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponService } from '../../../core/services/coupon.service';
import { Coupon } from '../../../core/models/coupon.model';

@Component({
  selector: 'app-manage-coupons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-coupons.html',
  styleUrl: './manage-coupons.css',
})
export class ManageCoupons implements OnInit {
  private couponService = inject(CouponService);

  coupons = signal<Coupon[]>([]);
  
  newCoupon = {
    code: '',
    discountPercentage: 0,
    expiryDate: '',
    minAmount: 0,
    isActive: true
  };

  ngOnInit() {
    this.loadCoupons();
  }

  loadCoupons() {
    this.couponService.getCoupons().subscribe({
      next: (data) => this.coupons.set(data),
      error: (err) => console.error('Error loading coupons', err)
    });
  }

  addCoupon() {
    if (!this.newCoupon.code || !this.newCoupon.discountPercentage) {
      alert('يرجى إدخال الكود ونسبة الخصم');
      return;
    }

    this.couponService.createCoupon(this.newCoupon as any).subscribe({
      next: () => {
        alert('تم إضافة الكوبون بنجاح!');
        this.loadCoupons();
        this.newCoupon = { code: '', discountPercentage: 0, expiryDate: '', minAmount: 0, isActive: true };
      },
      error: (err) => alert('فشل إضافة الكوبون')
    });
  }
}
