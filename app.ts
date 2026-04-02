import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { WhatsappButton } from './shared/components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, Footer, WhatsappButton],
  template: `
    <app-navbar *ngIf="!isDashboard()"></app-navbar>
    
    <main>
      <router-outlet></router-outlet>
    </main>
    
    <app-footer *ngIf="!isDashboard()"></app-footer>
    
    <app-whatsapp-button></app-whatsapp-button>
  `
})
export class App {
  private router = inject(Router);

  isDashboard(): boolean {
    return this.router.url.startsWith('/dashboard');
  }
}
