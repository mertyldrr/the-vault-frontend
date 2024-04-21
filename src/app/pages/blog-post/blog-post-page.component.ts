import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../models/blog-post.interface';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, MarkdownComponent, FooterComponent],
  templateUrl: './blog-post-page.component.html',
  styleUrl: './blog-post-page.component.css',
})
export class BlogPostPageComponent implements OnInit {
  blogPost$!: Observable<BlogPost>;
  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.blogPost$ = this.blogPostService.getBlogPostById(params['id']);
    });
  }
}
