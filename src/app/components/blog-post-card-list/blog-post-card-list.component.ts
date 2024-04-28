import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../../models/blog-post.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { BlogPostCardComponent } from '../blog-post-card/blog-post-card.component';

@Component({
  selector: 'app-blog-post-card-list',
  standalone: true,
  imports: [AsyncPipe, BlogPostCardComponent, NgIf],
  templateUrl: './blog-post-card-list.component.html',
  styleUrl: './blog-post-card-list.component.css',
})
export class BlogPostCardListComponent {
  @Input() blogPosts$!: Observable<BlogPost[]>;
}
