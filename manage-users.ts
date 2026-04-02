import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css',
})
export class ManageUsers implements OnInit {
  private adminService = inject(AdminService);

  users = signal<any[]>([]);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (users) => this.users.set(users),
      error: (err) => console.error('Error loading users', err)
    });
  }

  toggleUserStatus(userId: number) {
    this.adminService.toggleUserStatus(userId).subscribe({
      next: (res) => {
        alert(res.message);
        this.loadUsers(); // Refresh
      },
      error: (err) => {
        console.error('Error toggling user status', err);
        alert(err.error?.message || 'فشل في تحديث حالة المستخدم');
      }
    });
  }
}
