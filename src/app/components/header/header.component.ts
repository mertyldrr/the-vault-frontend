import { Component } from '@angular/core';
import { faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeService } from '../../theme/theme.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, NgIf, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public readonly faMoon = faMoon;
  public readonly faUser = faUser;
  public readonly faSun = faSun;

  constructor(
    private router: Router,
    private authService: AuthService,
    protected themeService: ThemeService
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  async navigateToSignUp() {
    await this.router.navigate(['signup']);
  }

  async navigateToLogin() {
    await this.router.navigate(['login']);
  }

  async logout() {
    this.authService.logout();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
