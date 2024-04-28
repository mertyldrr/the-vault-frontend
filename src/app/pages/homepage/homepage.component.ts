import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BlogPostCardComponent } from '../../components/blog-post-card/blog-post-card.component';
import { FeaturedBlogPostComponent } from '../../featured-blog-post/featured-blog-post.component';
import { SignupPage } from '../signup/signup-page.component';
import { LoginPage } from '../login/login-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe } from '@angular/common';
import { MyPostsPage } from '../my-posts/my-posts-page.component';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { BlogPost } from '../../models/blog-post.interface';
import { Observable } from 'rxjs';
import { BlogPostCardListComponent } from '../../components/blog-post-card-list/blog-post-card-list.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BlogPostCardComponent,
    FeaturedBlogPostComponent,
    SignupPage,
    FontAwesomeModule,
    LoginPage,
    AsyncPipe,
    MyPostsPage,
    BlogPostCardListComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomePage implements OnInit {
  blogPosts$!: Observable<Array<BlogPost>>;
  constructor(private blogPostService: BlogPostService) {}

  ngOnInit() {
    this.blogPosts$ = this.blogPostService.getBlogPostsRandom();
  }
}
