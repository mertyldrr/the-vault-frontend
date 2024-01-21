import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { BlogPostComponent } from '../components/blog-post/blog-post.component';
import { FeaturedBlogPostComponent } from '../featured-blog-post/featured-blog-post.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe } from '@angular/common';
import { ModalService } from '../services/modal/modal.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BlogPostComponent,
    FeaturedBlogPostComponent,
    SignupModalComponent,
    FontAwesomeModule,
    LoginModalComponent,
    AsyncPipe,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor(protected modalService: ModalService) {}
}
