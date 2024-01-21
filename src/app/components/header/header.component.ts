import { Component } from '@angular/core';
import { faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeService } from '../../theme/theme.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public readonly faMoon = faMoon;
  public readonly faUser = faUser;
  public readonly faSun = faSun;

  constructor(
    private modalService: ModalService,
    protected themeService: ThemeService
  ) {}

  showSignupModal(): void {
    this.modalService.showSignUpModal();
  }

  showLoginModal(): void {
    this.modalService.showLoginModal();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
