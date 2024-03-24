import { Component } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import { ImageUploadService } from '../../services/image-upload/image-upload.service';
import { ImageUploadResponseDto } from '../../models/image-upload.interface';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [QuillEditorComponent, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  quillEditorRef: Quill | undefined = undefined;
  title: string = '';
  content: string = '';

  constructor(
    private blogPostService: BlogPostService,
    private imageUploadService: ImageUploadService,
    private authService: AuthService
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

    const imgElements = document.querySelectorAll(
      'img[src^="data:"]'
    ) as NodeListOf<HTMLImageElement>;
    const uploadPromises: Promise<void>[] = [];
    imgElements.forEach((img: HTMLImageElement) => {
      const base64String = img.src.replace(/^data:image\/\w+;base64,/, '');
      const imageBlob = this.dataURItoBlob(base64String);
      // file name will be overwritten by a unique id in the backend
      const imageFile = new File([imageBlob], 'placeholder.png');

      const range = this.quillEditorRef?.getSelection();

      if (range) {
        const uploadPromise = new Promise<void>((resolve, reject): void => {
          this.imageUploadService.uploadImage(imageFile).subscribe({
            next: (res: ImageUploadResponseDto) => {
              console.log('Image uploaded successfully:', res.url);

              // Replace the existing <img> element attributes with the new values
              img.src = res.url;

              // Find the index of the 'img' element among its siblings in the parent node's child nodes array.
              if (img.parentNode) {
                const index = Array.from(img.parentNode.childNodes).indexOf(
                  img
                );
                // Move the cursor to the end of the inserted image
                this.quillEditorRef?.setSelection(index + 1);
              }
              resolve();
            },
            error: error => {
              console.error('Error uploading image:', error);
              reject();
            },
          });
        });
        uploadPromises.push(uploadPromise);
      }
    });
    // Wait for all image uploads to complete before creating the post
    Promise.all(uploadPromises)
      .then(() => {
        console.log('All images uploaded successfully');
        this.createPost(draft);
      })
      .catch(error => {
        console.error('Error uploading images:', error);
        // Handle error if needed
      });
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: 'image/png' });
  }
}
