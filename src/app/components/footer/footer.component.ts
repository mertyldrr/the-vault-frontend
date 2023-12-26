import { Component } from '@angular/core';
import { NewsletterComponent } from './newsletter/newsletter.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NewsletterComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
