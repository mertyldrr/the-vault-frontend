import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../../models/user.interface';
import { getStoredToken } from '../../utils/local-storage/utils';
import { Token } from '../../types';
import { UserStateService } from '../user-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user';

  constructor(
    private http: HttpClient,
    private userStateService: UserStateService
  ) {}

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
    return this.http
      .get<User>(`${this.apiUrl}/me`, {
        headers,
      })
      .pipe(
        tap(user => this.userStateService.setCurrentUser(user)),
        catchError(error => {
          console.error('Error fetching current user:', error);
          return of(null); // Return null if there's an error
        })
      );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
