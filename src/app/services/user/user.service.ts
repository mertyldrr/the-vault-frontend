import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { getStoredToken } from '../../utils/local-storage/utils';
import { Token } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.apiUrl);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  getCurrentUser(): Observable<User | null> {
    const storedAccessToken = getStoredToken(Token.Access);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${storedAccessToken}`,
    });
    return this.http.get<User>(`${this.apiUrl}/me`, {
      headers,
    });
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
