import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BlogPostCardComponent } from '../../components/blog-post-card/blog-post-card.component';
import { FeaturedBlogPostComponent } from '../../featured-blog-post/featured-blog-post.component';
import { SignupPage } from '../signup/signup-page.component';
import { LoginPage } from '../login/login-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe } from '@angular/common';
import { MyPostsPage } from '../my-posts/my-posts-page.component';

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
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor() {}
}
