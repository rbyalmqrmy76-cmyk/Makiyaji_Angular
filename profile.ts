import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);

  userInfo = signal({
    fullName: '',
    phone: '',
    email: '',
    username: '',
    address: '',
    role: '',
    profileImage: ''
  });

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (user) => {
        this.userInfo.set({
          fullName: user.fullName,
          phone: user.phone || '',
          email: user.email,
          username: user.username,
          address: user.address || '',
          role: user.role || 'User',
          profileImage: user.profileImage || ''
        });
      },
      error: (err) => console.error('Error loading profile', err)
    });
  }

  saveProfile() {
    const payload = {
      fullName: this.userInfo().fullName,
      phone: this.userInfo().phone,
      address: this.userInfo().address,
      profileImage: this.userInfo().profileImage
    };

    this.authService.updateProfile(payload).subscribe({
      next: () => {
        alert('تم حفظ إعدادات حسابكِ بنجاح!');
        // Optionally reload or sync with localStorage
      },
      error: (err) => {
        console.error('Error updating profile', err);
        alert('حدث خطأ أثناء حفظ الملف الشخصي');
      }
    });
  }
}
