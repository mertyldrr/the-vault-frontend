import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../models/blog-post.interface';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { QuillViewHTMLComponent } from 'ngx-quill';

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    FooterComponent,
    HlmButtonDirective,
    QuillViewHTMLComponent,
  ],
  templateUrl: './blog-post-page.component.html',
  styleUrl: './blog-post-page.component.css',
})
export class BlogPostPage implements OnInit {
  blogPost: BlogPost | null = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.blogPostService.getBlogPostById(params['id']).subscribe(blogPost => {
        this.blogPost = blogPost;
      });
    });
  }

  navigateToEdit() {
    if (this.blogPost) {
      this.router.navigate(['/post', this.blogPost.id, 'edit'], {
        state: { blogPost: this.blogPost },
      });
    } else {
      return;
    }
  }
}
