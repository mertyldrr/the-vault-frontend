import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './theme/theme.service';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { UserStateService } from './services/user-state.service';
import { User } from './models/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, HttpClientModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-blog';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private userStateService: UserStateService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Check if the user is already authenticated (e.g., if there's a stored token)
    if (this.authService.isAuthenticated()) {
      // Fetch the current user's information
      this.userService.getCurrentUser().subscribe({
        next: (user: User | null) => {
          this.userStateService.setCurrentUser(user);
        },
        error: error => {
          console.error('Error fetching current user:', error);
        },
      });
    }
  }
}
