import { Component } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import { ImageUploadService } from '../../services/image-upload/image-upload.service';
import { ImageUploadResponseDto } from '../../models/image-upload.interface';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [QuillEditorComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  quillEditorRef: Quill | undefined = undefined;

  constructor(private imageUploadService: ImageUploadService) {}

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
  }

  submitHandler() {
    const imgElements = document.querySelectorAll(
      'img[src^="data:"]'
    ) as NodeListOf<HTMLImageElement>;
    imgElements.forEach((img: HTMLImageElement) => {
      const base64String = img.src.replace(/^data:image\/\w+;base64,/, '');
      const imageBlob = this.dataURItoBlob(base64String);
      // file name will be overwritten by a unique id in the backend
      const imageFile = new File([imageBlob], 'placeholder.png');

      const range = this.quillEditorRef?.getSelection();

      if (range) {
        this.imageUploadService.uploadImage(imageFile).subscribe({
          next: (res: ImageUploadResponseDto) => {
            console.log('Image uploaded successfully:', res.url);

            // Replace the existing <img> element attributes with the new values
            img.src = res.url;

            // Find the index of the 'img' element among its siblings in the parent node's child nodes array.
            if (img.parentNode) {
              const index = Array.from(img.parentNode.childNodes).indexOf(img);
              // Move the cursor to the end of the inserted image
              this.quillEditorRef?.setSelection(index + 1);
            }
          },
          error: error => {
            console.error('Error uploading image:', error);
          },
        });
      }
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
