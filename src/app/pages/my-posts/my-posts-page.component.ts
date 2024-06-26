import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { BlogPost } from '../../models/blog-post.interface';
import { catchError, filter, map, Observable, Subject, switchMap, throwError } from 'rxjs';
import { BlogPostCardComponent } from '../../components/blog-post-card/blog-post-card.component';
import { NgForOf } from '@angular/common';
import { BlogPostPage } from '../blog-post/blog-post-page.component';
import { BlogPostCardListComponent } from '../../components/blog-post-card-list/blog-post-card-list.component';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [BlogPostCardComponent, NgForOf, BlogPostPage, BlogPostCardListComponent],
  templateUrl: './my-posts-page.component.html',
  styleUrl: './my-posts-page.component.css',
})
export class MyPostsPage implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  blogPosts$!: Observable<Array<BlogPost>>;
  constructor(
    private userStateService: UserStateService,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit() {
    this.blogPosts$ = this.userStateService.currentUser$.pipe(
      filter(user => !!user), // Filter out null user
      switchMap(user => this.blogPostService.getBlogPostsByUserId(user!.id)),
      map(blogPosts => this.sortBlogPosts(blogPosts)),
      catchError(error => {
        console.error('Error fetching blog posts:', error);
        // Handle the error, return an empty array or re-throw the error
        return throwError(() => error);
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private sortBlogPosts(blogPosts: BlogPost[]): BlogPost[] {
    return blogPosts.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA; // Sort in descending order, latest first
    });
  }
}
