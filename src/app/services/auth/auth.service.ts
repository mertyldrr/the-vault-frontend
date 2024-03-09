import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuthenticatedUser,
  AuthRequestDto,
  CreateUserDto,
  RefreshTokenResponseDto,
} from '../../models/auth.interface';
import { getStoredToken, removeToken } from '../../utils/local-storage/utils';
import { Token } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    // Check if access token exists
    const accessToken = getStoredToken(Token.Access);
    return !!accessToken;
  }

  signUp(user: CreateUserDto): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(`${this.apiUrl}/signup`, user);
  }

  login(credentials: AuthRequestDto): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  refreshToken(oldRefreshToken: string): Observable<RefreshTokenResponseDto> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${oldRefreshToken}`,
    });
    return this.http.get<RefreshTokenResponseDto>(`${this.apiUrl}/refresh`, {
      headers,
    });
  }

  logout(): void {
    removeToken(Token.Access);
    removeToken(Token.Refresh);
  }
}
