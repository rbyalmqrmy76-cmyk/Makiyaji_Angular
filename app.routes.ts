import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Products } from './features/products/products';
import { ProductDetail } from './features/product-detail/product-detail';
import { Cart } from './features/cart/cart';
import { Checkout } from './features/checkout/checkout';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { About } from './features/about/about';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout, canActivate: [authGuard] },
  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', loadComponent: () => import('./features/dashboard/summary/summary').then(m => m.Summary) },
      { path: 'my-products', loadComponent: () => import('./features/dashboard/my-products/my-products').then(m => m.MyProducts) },
      { path: 'add-product', loadComponent: () => import('./features/dashboard/add-product/add-product').then(m => m.AddProduct) },
      { path: 'edit-product/:id', loadComponent: () => import('./features/dashboard/edit-product/edit-product').then(m => m.EditProduct) },
      { path: 'orders', loadComponent: () => import('./features/dashboard/my-orders/my-orders').then(m => m.MyOrders) },
      { path: 'categories', loadComponent: () => import('./features/dashboard/manage-categories/manage-categories').then(m => m.ManageCategories), canActivate: [adminGuard] },
      { path: 'coupons', loadComponent: () => import('./features/dashboard/manage-coupons/manage-coupons').then(m => m.ManageCoupons), canActivate: [adminGuard] },
      { path: 'reports', loadComponent: () => import('./features/dashboard/reports/reports').then(m => m.Reports), canActivate: [adminGuard] },
      { path: 'users', loadComponent: () => import('./features/dashboard/manage-users/manage-users').then(m => m.ManageUsers), canActivate: [adminGuard] },
      { path: 'profile', loadComponent: () => import('./features/dashboard/profile/profile').then(m => m.Profile) }
    ]
  },
  { path: 'about', component: About },
  { path: '**', redirectTo: '' }
];
