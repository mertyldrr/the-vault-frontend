import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../models/blog-post.interface';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { QuillEditorComponent, QuillViewHTMLComponent } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Quill from 'quill';

@Component({
  selector: 'app-edit-blog-post',
  standalone: true,
  imports: [
    HlmButtonDirective,
    QuillEditorComponent,
    ReactiveFormsModule,
    FormsModule,
    QuillViewHTMLComponent,
  ],
  templateUrl: './edit-blog-post-page.component.html',
  styleUrl: './edit-blog-post-page.component.css',
})
export class EditBlogPostPage implements OnInit {
  quillEditorRef: Quill | undefined = undefined;
  title: string = '';
  content: string = '';
  blogPost!: BlogPost;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          const postId = params.get('id');
          if (postId) {
            return this.fetchBlogPost(postId);
          } else {
            return throwError(() => 'Post ID not available');
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => error);
        })
      )
      .subscribe(blogPost => {
        this.blogPost = blogPost;
        this.title = blogPost.title;
        this.content = blogPost.content;
      });
  }

  private fetchBlogPost(postId: string) {
    const blogPostFromState = history.state.blogPost as BlogPost;
    if (blogPostFromState) {
      return of(blogPostFromState);
    } else {
      return this.blogPostService.getBlogPostById(+postId);
    }
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
  }
}
