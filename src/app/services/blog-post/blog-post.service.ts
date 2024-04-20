import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  BlogPost,
  BlogPostCreateDto,
  BlogPostUpdateDto,
} from '../../models/blog-post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  private apiUrl = environment.apiUrl + '/blog-post';
  constructor(private http: HttpClient) {}

  createBlogPost(blogPost: BlogPostCreateDto): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}`, blogPost);
  }

  getBlogPostsByUserId(userId: number): Observable<Array<BlogPost>> {
    return this.http.get<Array<BlogPost>>(`${this.apiUrl}/${userId}/posts`);
  }

  updateBlogPost(
    id: number,
    blogPost: BlogPostUpdateDto
  ): Observable<BlogPost> {
    return this.http.patch<BlogPost>(`${this.apiUrl}/${id}`, blogPost);
  }
}
