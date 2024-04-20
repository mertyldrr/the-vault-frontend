import { Component, Input } from '@angular/core';
import { TagComponent } from '../tag/tag.component';
import { BlogPost } from '../../models/blog-post.interface';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent {
  @Input() blogPost!: BlogPost;

  constructor() {}
}
