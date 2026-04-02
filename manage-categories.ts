import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-categories.html',
  styleUrl: './manage-categories.css',
})
export class ManageCategories {
  categories = signal([
    { id: 1, name: 'مكياج الوجه', count: 24, icon: '💄' },
    { id: 2, name: 'العناية بالبشرة', count: 18, icon: '🧴' },
    { id: 3, name: 'العطور العالمية', count: 12, icon: '✨' },
    { id: 4, name: 'اكسسوارات الجمال', count: 35, icon: '💍' }
  ]);

  addCategory() {
    alert('إضافة فئة جديدة سيتم ربطها بقاعدة البيانات قريباً!');
  }
}
