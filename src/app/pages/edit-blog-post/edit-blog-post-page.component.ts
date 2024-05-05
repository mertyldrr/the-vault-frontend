import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogPost, BlogPostUpdateDto } from '../../models/blog-post.interface';
import { catchError, Subject, switchMap, takeUntil, throwError } from 'rxjs';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { QuillEditorComponent, QuillViewHTMLComponent } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Quill from 'quill';
import { getThumbnail, prepareQuillImageUpload } from '../../utils/utils';
import { ImageUploadService } from '../../services/image-upload/image-upload.service';
import { HlmButtonDirective } from '../../spartan-ui/ui-button-helm/src';
import { LoadingOverlayComponent } from '../../components/loading-overlay/loading-overlay.component';
import { BlogPostStateService } from '../../services/blog-post-state.service';

@Component({
  selector: 'app-edit-blog-post',
  standalone: true,
  imports: [
    HlmButtonDirective,
    QuillEditorComponent,
    ReactiveFormsModule,
    FormsModule,
    QuillViewHTMLComponent,
    NgIf,
    HlmButtonDirective,
    LoadingOverlayComponent,
  ],
  templateUrl: './edit-blog-post-page.component.html',
  styleUrl: './edit-blog-post-page.component.css',
})
export class EditBlogPostPage implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  quillEditorRef: Quill | undefined = undefined;
  title: string = '';
  content: string = '';
  draft: boolean = false;
  blogPost!: BlogPost;
  thumbnail: File | null = null;
  thumbnailUrl: string | null = null;
  isLoading = false;
  public spinnerColor: string | undefined = undefined;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogPostStateService: BlogPostStateService,
    private blogPostService: BlogPostService,
    private imageUploadService: ImageUploadService,
    private location: Location
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
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(blogPost => {
        console.log(blogPost);
        this.blogPost = blogPost;
        this.title = blogPost.title;
        this.content = blogPost.content;
        this.draft = blogPost.draft;
        if (blogPost.thumbnailUrl) {
          this.thumbnailUrl = blogPost.thumbnailUrl;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchBlogPost(postId: string) {
    return this.blogPostService.getBlogPostById(+postId);
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
  }

  updatePost(draft: boolean) {
    console.log('update started');
    const content = this.quillEditorRef?.getSemanticHTML() || '';
    const blogPostUpdateDto: BlogPostUpdateDto = {
      title: this.title,
      content,
      draft: this.draft,
    };
    return this.blogPostService.updateBlogPost(this.blogPost.id, blogPostUpdateDto);
  }

  async handleThumbnailUpload($event: Event) {
    try {
      const result = await getThumbnail($event, 400, 300);
      if (result) {
        // Do something with the thumbnail and thumbnailUrl
        this.thumbnail = result.thumbnail;
        this.thumbnailUrl = result.thumbnailUrl;
      } else {
        console.error('Thumbnail upload returned undefined.');
      }
    } catch (error) {
      console.error('Error handling thumbnail upload:', error);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  updateHandler(draft: boolean) {
    this.isLoading = true;
    if (this.title.trim() === '') {
      // TODO: do not allow the user to submit the form if the title is empty
    }
    const uploadPromises: Promise<void>[] = prepareQuillImageUpload(
      this.quillEditorRef,
      this.imageUploadService
    );
    // Wait for all image uploads to complete before creating the post
    Promise.all(uploadPromises)
      .then(() => {
        console.log('All images uploaded successfully');
        this.updatePost(draft).subscribe({
          next: updatedBlogPost => {
            this.spinnerColor = 'border-green-400';
            this.blogPostStateService.setBlogPost(updatedBlogPost);
            this.isLoading = false;
            this.location.back();
          },
          error: err => {
            this.spinnerColor = 'border-red-400';
            console.error('Error updating blog post:', err);
          },
        });
      })
      .catch(error => {
        this.spinnerColor = 'border-red-400';
        console.error('Error uploading images:', error);
      });
  }

  cancelHandler() {
    this.location.back();
  }
}
