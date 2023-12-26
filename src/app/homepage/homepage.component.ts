import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { BlogPostComponent } from '../components/blog-post/blog-post.component';
import { FeaturedBlogPostComponent } from '../featured-blog-post/featured-blog-post.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BlogPostComponent,
    FeaturedBlogPostComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
