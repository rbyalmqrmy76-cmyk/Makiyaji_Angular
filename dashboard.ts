import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  isSidebarOpen = signal(true);

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  logout() {
    // Logic for logout
    alert('تم تسجيل الخروج بنجاح!');
  }
}
