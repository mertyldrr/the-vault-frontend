import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { AuthService } from '../../services/auth/auth.service';
import { BlogPost } from '../../models/blog-post.interface';
import { catchError, filter, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { BlogPostComponent } from '../../components/blog-post/blog-post.component';
import { UserService } from '../../services/user/user.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [BlogPostComponent, NgForOf],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  blogPosts: Array<BlogPost> = [];
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit() {
    console.log('my posts init');
    this.userService
      .getCurrentUser()
      .pipe(
        takeUntil(this.destroy$),
        tap(user => console.log(user)),
        filter(user => user !== null), // Filter out null user
        switchMap(user => this.blogPostService.getBlogPostsByUserId(user!.id)),
        catchError(error => {
          console.error('Error fetching blog posts:', error);
          // Handle the error, return an empty array or re-throw the error
          throw new Error(error.message);
        })
      )
      .subscribe(posts => {
        console.log(posts.length, 'posts');
        this.blogPosts = posts;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
