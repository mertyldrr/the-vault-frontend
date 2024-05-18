import { Component, ElementRef, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import { ImageUploadService } from '../../services/image-upload/image-upload.service';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { getThumbnail, prepareQuillImageUpload } from '../../utils/utils';
import { HlmButtonDirective } from '../../spartan-ui/ui-button-helm/src';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [QuillEditorComponent, FormsModule, HlmButtonDirective, NgIf],
  templateUrl: './create-post-page.component.html',
  styleUrl: './create-post-page.component.css',
})
export class CreatePostPage {
  quillEditorRef: Quill | undefined = undefined;
  title: string = '';
  thumbnail: File | null = null;
  thumbnailUrl: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private blogPostService: BlogPostService,
    private imageUploadService: ImageUploadService,
    private router: Router
  ) {}

  createPost = (draft: boolean, s3FolderId: string) => {
    const blogPost = new FormData();
    const content = this.quillEditorRef!.getSemanticHTML();

    blogPost.append('title', this.title);
    blogPost.append('content', content);
    blogPost.append('draft', JSON.stringify(draft));
    blogPost.append('s3FolderId', s3FolderId);
    if (this.thumbnail) {
      blogPost.append('thumbnail', this.thumbnail);
    }
    this.blogPostService.createBlogPost(blogPost).subscribe({
      next: blogPost => {
        console.log('Post created successfully', blogPost);
        this.navigateToHomePage();
      },
      error: error => {
        console.error('Error creating post:', error);
      },
    });
  };

  submitHandler(draft: boolean) {
    const s3FolderId = uuidv4();

    const uploadPromises: Promise<void>[] = prepareQuillImageUpload(
      s3FolderId,
      this.quillEditorRef,
      this.imageUploadService
    );
    // Wait for all image uploads to complete before creating the post
    Promise.all(uploadPromises)
      .then(() => {
        console.log('All images uploaded successfully');
        this.createPost(draft, s3FolderId);
      })
      .catch(error => {
        console.error('Error uploading images:', error);
      });
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

  navigateToHomePage() {
    this.router.navigate(['/']);
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  shouldDisableButton() {
    return this.title.trim() === '';
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
  }
}
