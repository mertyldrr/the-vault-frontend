import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showSignUpModalSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public showSignUpModal$: Observable<boolean> =
    this.showSignUpModalSubject.asObservable();
  private showLoginModalSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public showLoginModal$: Observable<boolean> =
    this.showLoginModalSubject.asObservable();

  constructor() {}

  public showSignUpModal(): void {
    this.showSignUpModalSubject.next(true);
  }

  public closeSignUpModal(): void {
    this.showSignUpModalSubject.next(false);
  }

  public showLoginModal(): void {
    this.showLoginModalSubject.next(true);
  }

  public closeLoginModal(): void {
    this.showLoginModalSubject.next(false);
  }
}
