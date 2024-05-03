import { Component } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import { ImageUploadService } from '../../services/image-upload/image-upload.service';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { prepareImageUpload } from '../../utils/utils';
import { HlmButtonDirective } from '../../spartan-ui/ui-button-helm/src';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [QuillEditorComponent, FormsModule, HlmButtonDirective],
  templateUrl: './create-post-page.component.html',
  styleUrl: './create-post-page.component.css',
})
export class CreatePostPage {
  quillEditorRef: Quill | undefined = undefined;
  title: string = '';
  content: string = '';

  constructor(
    private blogPostService: BlogPostService,
    private imageUploadService: ImageUploadService
  ) {}

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
  }

  createPost = (draft: boolean) => {
    const content = this.quillEditorRef?.getSemanticHTML() || '';
    this.blogPostService
      .createBlogPost({
        title: this.title,
        content: content,
        draft: draft,
      })
      .subscribe({
        next: blogPost => {
          console.log('Post created successfully');
        },
        error: error => {
          console.error('Error creating post:', error);
        },
      });
  };

  submitHandler(draft: boolean) {
    if (this.title.trim() === '') {
      // TODO: do not allow the user to submit the form if the title is empty
    }

    const uploadPromises: Promise<void>[] = prepareImageUpload(
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
}
