import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FaIconComponent],
  templateUrl: './signup-modal.component.html',
  styleUrl: './signup-modal.component.css',
})
export class SignupModalComponent {
  isModalVisible = false;
  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  passwordConfirm = new FormControl('');
  @Output() closeSignUpModal = new EventEmitter<boolean>();
  passwordVisible = false;

  protected readonly faXmark = faXmark;
  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faEye = faEye;

  closeModal(): void {
    this.closeSignUpModal.emit(false);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
