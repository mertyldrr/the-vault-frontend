// theme.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>(Theme.Light);
  theme$ = this.themeSubject.asObservable();

  toggleTheme() {
    const currentTheme = this.themeSubject.getValue();
    const newTheme = currentTheme === Theme.Light ? Theme.Dark : Theme.Light;
    this.themeSubject.next(newTheme);
  }
}
