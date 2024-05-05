import { ImageUploadResponseDto } from '../models/image-upload.interface';
import Quill from 'quill';
import { ImageUploadService } from '../services/image-upload/image-upload.service';
import { FileInputEvent } from '../types';

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
export function prepareQuillImageUpload(
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

// Helper function to read the file and return a data URL
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file.'));
    };
    reader.readAsDataURL(file);
  });
}

// Helper function to resize an image and return a File object
export function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      // Resize image on canvas
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob: any) => {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(resizedFile);
        }, file.type);
      } else {
        reject(new Error('Failed to resize image.'));
      }
    };
    img.onerror = () => {
      reject(new Error('Failed to load image.'));
    };
    img.src = URL.createObjectURL(file);
  });
}

export async function getThumbnail($event: Event, maxWidth: number, maxHeight: number) {
  const files = ($event as FileInputEvent).target.files;
  if (files && files.length > 0) {
    const uploadedThumbnail = files[0];
    try {
      // Resize the uploaded thumbnail asynchronously
      const thumbnail = await resizeImage(uploadedThumbnail, maxWidth, maxHeight);
      // Display resized thumbnail
      const thumbnailUrl = await readFileAsDataURL(thumbnail);
      return { thumbnail, thumbnailUrl };
    } catch (error) {
      console.error('Error resizing thumbnail:', error);
    }
  }
  // Return undefined if no files are present
  return undefined;
}
