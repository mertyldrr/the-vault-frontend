import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from '../../models/blog-post.interface';
import { map, Observable } from 'rxjs';
import { UserStateService } from '../user-state.service';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  private apiUrl = environment.apiUrl + '/blog-post';
  constructor(
    private http: HttpClient,
    private userStateService: UserStateService
  ) {}

  createBlogPost(blogPost: FormData): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}`, blogPost);
  }

  getBlogPostById(blogPostId: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${blogPostId}`);
  }

  getBlogPostsByUserId(userId: number): Observable<Array<BlogPost>> {
    return this.http.get<Array<BlogPost>>(`${this.apiUrl}/${userId}/posts`);
  }

  getBlogPostsRandom(): Observable<Array<BlogPost>> {
    return this.http.get<Array<BlogPost>>(`${this.apiUrl}/random`);
  }

  updateBlogPost(id: number, blogPost: FormData): Observable<BlogPost> {
    return this.http.patch<BlogPost>(`${this.apiUrl}/${id}`, blogPost);
  }

  deleteBlogPost(id: number): Observable<any> {
    return this.http.delete<BlogPost>(`${this.apiUrl}/${id}`);
  }

  // Check if the authenticated user is the owner of the blog post
  isUserOwner(authorId: number): Observable<boolean> {
    return this.userStateService.currentUser$.pipe(map(user => !!user && user.id === authorId));
  }
}
