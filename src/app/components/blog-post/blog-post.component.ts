import { Component } from '@angular/core';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent {}
