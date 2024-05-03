import { ImageUploadResponseDto } from '../models/image-upload.interface';
import Quill from 'quill';
import { ImageUploadService } from '../services/image-upload/image-upload.service';

export function dataURItoBlob(dataURI: string): Blob {
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([int8Array], { type: 'image/png' });
}

// Create a utility function for uploading images
export function prepareImageUpload(
  quillEditorRef: Quill | undefined,
  imageUploadService: ImageUploadService
): Array<Promise<void>> {
  const imgElements = document.querySelectorAll(
    'img[src^="data:"]'
  ) as NodeListOf<HTMLImageElement>;

  const uploadPromises: Promise<void>[] = [];

  imgElements.forEach((img: HTMLImageElement) => {
    const base64String = img.src.replace(/^data:image\/\w+;base64,/, '');
    const imageBlob = dataURItoBlob(base64String);
    // file name will be overwritten by a unique id in the backend
    const imageFile = new File([imageBlob], 'placeholder.png');

    const range = quillEditorRef?.getSelection();
    console.log(range, 'range');
    if (range) {
      const uploadPromise = new Promise<void>((resolve, reject): void => {
        imageUploadService.uploadImage(imageFile).subscribe({
          next: (res: ImageUploadResponseDto) => {
            console.log('Image uploaded successfully:', res.url);

            // Replace the existing <img> element attributes with the new values
            img.src = res.url;

            // Find the index of the 'img' element among its siblings in the parent node's child nodes array.
            if (img.parentNode) {
              const index = Array.from(img.parentNode.childNodes).indexOf(img);
              // Move the cursor to the end of the inserted image
              quillEditorRef?.setSelection(index + 1);
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
  return uploadPromises;
}
