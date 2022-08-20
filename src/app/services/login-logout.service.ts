import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginLogoutService {
  token: string | null = '';
  userChange = new BehaviorSubject<string | null>('');
  userId: number | string = '';
  userIdChange = new BehaviorSubject<number | string>('');

  constructor() {
    this.userChange.subscribe((value) => {
      this.token = value;
    });
    let token: string | null = localStorage.getItem('token');

    this.userChange.next(token);
    let userId = localStorage.getItem('userId') || "";
    this.userIdChange.next(userId);
    this.userIdChange.subscribe((id) => {
      this.userId = id;
    });
  }
  dummyAuth(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.token);
      }, 500);
    });
    return promise;
  }

  loginUser(id: string) {
    //! id is token
    this.userChange.next(id);
    localStorage.setItem('token', `${id}`);

    this.userIdChange.next(id);
    localStorage.setItem('userId', `${id}`);
  }

  logoutUser() {
    this.userChange.next('');
    localStorage.setItem('token', '');
    this.userIdChange.next('');
    localStorage.setItem('userId', ``);
  }
}
