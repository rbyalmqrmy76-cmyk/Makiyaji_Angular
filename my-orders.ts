import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CurrencyYerPipe } from '../../../shared/pipes/currency-yer-pipe';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, CurrencyYerPipe, RouterLink],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders implements OnInit {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

  orders = signal<Order[]>([]);
  isAdmin = this.authService.isAdmin;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const stream$ = this.isAdmin() 
      ? this.orderService.getAllOrders() 
      : this.orderService.getMyOrders();

    stream$.subscribe({
      next: (orders) => this.orders.set(orders),
      error: (err) => console.error('Error loading orders', err)
    });
  }

  updateStatus(id: number, newStatus: string) {
    this.orderService.updateOrderStatus(id, newStatus).subscribe({
      next: () => {
        alert(`تم تحديث حالة الطلب إلى: ${newStatus}`);
        this.loadOrders();
      },
      error: (err) => console.error('Error updating status', err)
    });
  }
}
