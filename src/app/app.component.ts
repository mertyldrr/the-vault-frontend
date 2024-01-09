import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './theme/theme.service';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-blog';

  constructor(public themeService: ThemeService) {}
}
