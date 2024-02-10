import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BlogPostComponent } from '../../components/blog-post/blog-post.component';
import { FeaturedBlogPostComponent } from '../../featured-blog-post/featured-blog-post.component';
import { SignupPage } from '../signup/signup-page.component';
import { LoginPage } from '../login/login-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BlogPostComponent,
    FeaturedBlogPostComponent,
    SignupPage,
    FontAwesomeModule,
    LoginPage,
    AsyncPipe,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor() {}
}
