import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyYerPipe } from '../../../shared/pipes/currency-yer-pipe';
import { AdminService, DashboardStats } from '../../../core/services/admin.service';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, CurrencyYerPipe],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  private adminService = inject(AdminService);
  private productService = inject(ProductService);

  dashboardStats = signal<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    revenueGrowth: 0,
    monthlySales: 0
  });
  topProducts = signal<Product[]>([]);

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.adminService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats.set(stats);
        this.loadTopSellingProducts();
      },
      error: (err) => console.error('Error loading stats for reports', err)
    });
  }

  loadTopSellingProducts() {
    this.productService.getProducts({ sortBy: 'sales' }).subscribe({
      next: (prods) => this.topProducts.set(prods.slice(0, 5)), // Best 5
      error: (err) => console.error('Error loading top products', err)
    });
  }
}
