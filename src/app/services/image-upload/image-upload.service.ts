import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ImageUploadResponseDto } from '../../models/image-upload.interface';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private apiUrl = environment.apiUrl + '/image';
  constructor(private http: HttpClient) {}

  uploadImage(image: File, s3FolderId: string): Observable<ImageUploadResponseDto> {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<ImageUploadResponseDto>(`${this.apiUrl}/upload/${s3FolderId}`, formData);
  }
}
