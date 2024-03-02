import { Component, Input } from '@angular/core';
import { clsx } from 'clsx';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'], // Fix the typo here
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'lg' = 'sm';
  @Input() twColor: string | undefined = 'border-blue-400';
  getFixedCircleClass(): string {
    return clsx(
      'border-gray rounded-full',
      { 'w-6 h-6 border-t-2 border-b-2': this.size === 'sm' },
      { 'h-24 w-24 border-t-8 border-b-8': this.size === 'lg' }
    );
  }

  getSpinCircleClasses(): string {
    return clsx(
      `absolute top-0 left-0 rounded-full ${this.twColor} animate-spin`,
      { 'w-6 h-6 border-t-2 border-b-2': this.size === 'sm' },
      { 'h-24 w-24 border-t-8 border-b-8': this.size === 'lg' }
    );
  }
}
