import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faEye,
  faEyeSlash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ValidationFeedbackComponent } from '../components/error-validation/validation-feedback.component';
import { ModalService } from '../services/modal/modal.service';
import { AuthService } from '../services/auth/auth.service';
import { AuthRequestDto } from '../models/auth.interface';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { storeToken } from '../utils/local-storage/utils';
import { Token } from '../types';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    ValidationFeedbackComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css',
})
export class LoginModalComponent {
  public loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public isLoading = false;
  public passwordVisible = false;
  public readonly faEye = faEye;
  public readonly faEyeSlash = faEyeSlash;
  public readonly faXmark = faXmark;
  public readonly faCheck = faCheck;

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  showSignupModal(): void {
    this.closeModal();
    this.modalService.showSignUpModal();
  }

  closeModal() {
    this.modalService.closeLoginModal();
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Submit the form
      this.isLoading = true;
      const userCredentials: AuthRequestDto = {
        email: this.loginForm.get('email')?.value!,
        password: this.loginForm.get('password')?.value!,
      };
      this.authService.login(userCredentials).subscribe({
        next: user => {
          this.isLoading = false;
          storeToken(Token.Access, user.accessToken!);
          storeToken(Token.Refresh, user.refreshToken!);
        },
        error: err => {
          this.isLoading = false;
          console.log(err);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      // Handle the case when the form is not valid (contains errors)
    }
  }
}
