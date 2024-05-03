import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogPostStateService {
  private blogPostSubject = new BehaviorSubject<BlogPost | null>(null);
  blogPost$: Observable<BlogPost | null> = this.blogPostSubject.asObservable();

  constructor() {}

  setBlogPost(blogPost: BlogPost) {
    this.blogPostSubject.next(blogPost);
  }
}
