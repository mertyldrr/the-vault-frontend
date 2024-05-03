import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPost } from '../../models/blog-post.interface';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { AsyncPipe, NgIf } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { HlmButtonDirective } from '../../spartan-ui/ui-button-helm/src';
import { HlmIconComponent } from '../../spartan-ui/ui-icon-helm/src';
import { BlogPostStateService } from '../../services/blog-post-state.service';
import { lucideFilePen, lucideTrash2 } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-blog-post-page',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.css'],
  standalone: true,
  imports: [
    QuillViewHTMLComponent,
    AsyncPipe,
    FooterComponent,
    HlmButtonDirective,
    HlmIconComponent,
    NgIf,
  ],
  providers: [provideIcons({ lucideFilePen, lucideTrash2 })],
})
export class BlogPostPage implements OnInit, OnDestroy {
  blogPost$!: Observable<BlogPost | null>;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private blogPostStateService: BlogPostStateService
  ) {}

  ngOnInit() {
    this.blogPost$ = this.blogPostStateService.blogPost$;
    // Check if the blog post is already available in the state
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const postId = params['id'];
      this.blogPostService.getBlogPostById(postId).subscribe(blogPost => {
        this.blogPostStateService.setBlogPost(blogPost); // Update the blog post state
      });
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToEdit(blogPostId: string) {
    this.router.navigate(['/post', blogPostId, 'edit']);
  }
}
