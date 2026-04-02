import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CurrencyYerPipe } from '../../../shared/pipes/currency-yer-pipe';
import { AdminService, DashboardStats } from '../../../core/services/admin.service';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, CurrencyYerPipe, RouterLink],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary implements OnInit {
  private adminService = inject(AdminService);
  private orderService = inject(OrderService);

  dashboardStats = signal<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    revenueGrowth: 0,
    monthlySales: 0
  });
  recentOrders = signal<Order[]>([]);

  ngOnInit() {
    this.loadStats();
    this.loadRecentOrders();
  }

  loadStats() {
    this.adminService.getDashboardStats().subscribe({
      next: (stats) => this.dashboardStats.set(stats),
      error: (err) => console.error('Error loading stats', err)
    });
  }

  loadRecentOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        // Assume latest orders come first or sort them
        this.recentOrders.set(orders.slice(0, 5));
      },
      error: (err) => console.error('Error loading recent orders', err)
    });
  }
}
