import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css',
})
export class LoginModalComponent {
  email = new FormControl('');
  password = new FormControl('');
  passwordVisible = false;
  @Output() closeLoginModal = new EventEmitter<boolean>();
  public readonly faEye = faEye;
  public readonly faEyeSlash = faEyeSlash;
  public readonly faXmark = faXmark;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  closeModal() {
    this.closeLoginModal.emit(false);
  }
}
