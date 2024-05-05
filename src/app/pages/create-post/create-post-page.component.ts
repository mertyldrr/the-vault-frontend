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
  content: string = '';
  thumbnail: File | null = null;
  thumbnailUrl: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private blogPostService: BlogPostService,
    private imageUploadService: ImageUploadService,
    private router: Router
  ) {}

  createPost = (draft: boolean) => {
    const blogPost = new FormData();

    blogPost.append('title', this.title);
    blogPost.append('content', this.content);
    blogPost.append('draft', JSON.stringify(draft));
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
    const uploadPromises: Promise<void>[] = prepareQuillImageUpload(
      this.quillEditorRef,
      this.imageUploadService
    );
    // Wait for all image uploads to complete before creating the post
    Promise.all(uploadPromises)
      .then(() => {
        console.log('All images uploaded successfully');
        this.createPost(draft);
      })
      .catch(error => {
        console.error('Error uploading images:', error);
      });
  }

  async handleThumbnailUpload($event: Event) {
    console.log('handle upload');
    try {
      const result = await getThumbnail($event, 400, 300);
      console.log(result, 'res');
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
    return this.title.trim() === '' || this.content.trim() === '';
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
  }
}
