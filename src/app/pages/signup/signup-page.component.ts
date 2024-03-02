import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  faCheck,
  faEye,
  faEyeSlash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';
import { ValidationFeedbackComponent } from '../../components/error-validation/validation-feedback.component';
import {
  lowercaseCharValidator,
  minLengthValidator,
  passwordMatchValidator,
  uppercaseCharValidator,
} from '../../utils/validators/signup.validator';
import { CreateUserDto } from '../../models/auth.interface';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { storeToken } from '../../utils/local-storage/utils';
import { Token } from '../../types';
import { Gender } from '../../models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FaIconComponent,
    NgClass,
    ValidationFeedbackComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPage {
  public isLoading = false;
  public passwordVisible = false;

  public signupForm = new FormGroup(
    {
      firstName: new FormControl<string | null>(null),
      lastName: new FormControl<string | null>(null),
      userName: new FormControl<string | null>(null),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        minLengthValidator(8),
        lowercaseCharValidator(),
        uppercaseCharValidator(),
      ]),
      passwordConfirm: new FormControl<string>('', [Validators.required]),
      birthDate: new FormControl<Date | null>(null),
      gender: new FormControl<Gender>(Gender.U),
    },
    { validators: passwordMatchValidator() }
  );

  public readonly faXmark = faXmark;
  public readonly faEyeSlash = faEyeSlash;
  public readonly faEye = faEye;
  public readonly faCheck = faCheck;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  get password() {
    return this.signupForm.get('password');
  }

  onSubmit() {
    this.isLoading = true;
    if (this.signupForm.valid) {
      const newUser: CreateUserDto = {
        firstName: this.signupForm.get('firstName')?.value ?? null,
        lastName: this.signupForm.get('lastName')?.value ?? null,
        username: this.signupForm.get('username')?.value ?? null,
        email: this.signupForm.get('email')?.value!,
        password: this.signupForm.get('password')?.value!,
        birthDate: this.signupForm.get('birthDate')?.value ?? null,
        gender: this.signupForm.get('gender')?.value ?? null,
      };
      this.authService.signUp(newUser).subscribe({
        next: user => {
          this.isLoading = false;
          storeToken(Token.Access, user.accessToken!);
          storeToken(Token.Refresh, user.refreshToken!);
        },
        error: () => {
          this.isLoading = false;
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

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
