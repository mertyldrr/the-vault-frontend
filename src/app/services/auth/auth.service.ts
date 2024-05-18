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
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  constructor(
    private http: HttpClient,
    private router: Router,
    private userStateService: UserStateService
  ) {}

  isAuthenticated(): boolean {
    // Check if access token exists
    const accessToken = getStoredToken(Token.Access);
    return !!accessToken;
  }

  signUp(user: CreateUserDto): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(`${this.apiUrl}/signup`, user);
  }

  login(credentials: AuthRequestDto): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(`${this.apiUrl}/login`, credentials);
  }

  logout(): void {
    removeToken(Token.Access);
    removeToken(Token.Refresh);
    this.userStateService.setCurrentUser(null);
    this.router.navigate(['/']);
  }

  refreshToken(): Observable<RefreshTokenResponseDto> {
    const storedRefreshToken = getStoredToken(Token.Refresh);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${storedRefreshToken}`,
    });
    return this.http.get<RefreshTokenResponseDto>(`${this.apiUrl}/refresh`, {
      headers,
    });
  }
}
