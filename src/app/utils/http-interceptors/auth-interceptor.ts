import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { getStoredToken, storeToken } from '../local-storage/utils';
import { Token } from '../../types';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  apiUrl = environment.apiUrl + '/auth';
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the auth token from local storage
    const accessToken = getStoredToken(Token.Access);
    const refreshToken = getStoredToken(Token.Refresh);
    let authReq: HttpRequest<any>;

    const isRefreshTokenRequest = req.url.includes(`${this.apiUrl}/refresh`);

    if (isRefreshTokenRequest) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${refreshToken}` },
      });
    } else {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
    }

    // Intercept the response to handle token refresh and errors
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Received 401 error, attempting to refresh token.');
          // Token expired or invalid, attempt to refresh
          return this.refreshTokenAndRetry(authReq, next).pipe(
            catchError(error => {
              console.error('Error during refresh:', error);
              // You may want to handle the error here, e.g., by logging out the user
              return throwError(() => error);
            })
          );
        } else if (error.status === 403) {
          // Handle 403 (Forbidden) errors, possibly due to token issues or unauthorized access
          console.error('Received 403 error. Logging out.');
          this.authService.logout();
          // Propagate the error to be handled by the application
          return throwError(() => error);
        }

        // For other errors, pass them along to be handled by the application
        return throwError(() => error);
      })
    );
  }

  private refreshTokenAndRetry(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const refreshToken = getStoredToken(Token.Refresh);

    if (!refreshToken) {
      // Handle the case where there is no refresh token, possibly redirect to log in
      return throwError(() => 'No refresh token available');
    }

    // Check if it's a refresh token request
    const isRefreshTokenRequest = req.url.includes(`${this.apiUrl}/refresh`);

    // Call your token refresh endpoint to get a new access token
    return this.authService.refreshToken().pipe(
      switchMap(({ refreshToken, accessToken }) => {
        // Update the stored access token only if it's not a refresh token request
        storeToken(Token.Access, accessToken);
        storeToken(Token.Refresh, refreshToken);

        // Set the appropriate header based on the request type
        const headers = isRefreshTokenRequest
          ? { Authorization: `Bearer ${refreshToken}` }
          : { Authorization: `Bearer ${accessToken}` };

        // Retry the original request with the new token
        const authReqWithNewToken = req.clone({
          setHeaders: headers,
        });

        return next.handle(authReqWithNewToken).pipe(
          catchError(error => {
            console.error('Error in retry request:', error);
            return throwError(() => error);
          })
        );
      }),
      catchError(refreshError => {
        // Handle refresh error, possibly redirect to log in
        console.error('Error refreshing token:', refreshError);
        return throwError(() => refreshError);
      })
    );
  }
}
