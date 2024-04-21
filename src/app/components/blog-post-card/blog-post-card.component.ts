import { Component, Input } from '@angular/core';
import { TagComponent } from '../tag/tag.component';
import { BlogPost } from '../../models/blog-post.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-post-card',
  standalone: true,
  imports: [TagComponent, RouterLink],
  templateUrl: './blog-post-card.component.html',
  styleUrl: './blog-post-card.component.css',
})
export class BlogPostCardComponent {
  @Input() blogPost!: BlogPost;

  constructor() {}

  formatDate(date: string): string {
    const dateObject = new Date(date);
    const options = {
      month: 'short' as const,
      day: '2-digit' as const,
      year: 'numeric' as const,
    };
    return dateObject.toLocaleDateString('en-US', options);
  }
}
