import { Component } from '@angular/core';
import { faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeService } from '../../theme/theme.service';
import { Router } from '@angular/router';

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
    private router: Router,
    protected themeService: ThemeService
  ) {}

  navigateToSignUp(): void {
    this.router.navigate(['signup']);
  }

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
