import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from "../../shared/components/breadcrumb/breadcrumb";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About { }
