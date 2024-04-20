import { Component, Input } from '@angular/core';
import { TagComponent } from '../tag/tag.component';
import { BlogPost } from '../../models/blog-post.interface';

@Component({
  selector: 'app-blog-post-card',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './blog-post-card.component.html',
  styleUrl: './blog-post-card.component.css',
})
export class BlogPostCardComponent {
  @Input() blogPost!: BlogPost;

  constructor() {}
}
