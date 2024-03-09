import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ValidationFeedbackComponent } from '../../components/error-validation/validation-feedback.component';
import { AuthService } from '../../services/auth/auth.service';
import { AuthRequestDto } from '../../models/auth.interface';
import { storeToken } from '../../utils/local-storage/utils';
import { Token } from '../../types';
import { Router } from '@angular/router';
import { LoadingOverlayComponent } from '../../components/loading-overlay/loading-overlay.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    ValidationFeedbackComponent,
    LoadingOverlayComponent,
    NgIf,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPage {
  public loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public isLoading = false;
  public passwordVisible = false;
  public spinnerColor: string | undefined = undefined;
  public readonly faEye = faEye;
  public readonly faEyeSlash = faEyeSlash;
  public readonly faXmark = faXmark;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async navigateToSignUp() {
    await this.router.navigate(['/signup']);
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const userCredentials: AuthRequestDto = {
        email: this.loginForm.get('email')?.value!,
        password: this.loginForm.get('password')?.value!,
      };
      this.authService.login(userCredentials).subscribe({
        next: user => {
          this.spinnerColor = 'border-green-400';
          // save tokens to the local storage
          storeToken(Token.Access, user.accessToken!);
          storeToken(Token.Refresh, user.refreshToken!);
        },
        error: err => {
          this.isLoading = false;
          this.spinnerColor = undefined;
          console.log(err);
        },
        complete: () => {
          setTimeout(async () => {
            await this.router.navigate(['/']);
            this.isLoading = false;
          }, 2000);
        },
      });
    } else {
      // Handle the case when the form is not valid (contains errors)
    }
  }
}
