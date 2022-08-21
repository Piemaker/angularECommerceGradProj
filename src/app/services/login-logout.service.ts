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
  userName = '';
  userNameChange = new BehaviorSubject<string>('');
  userEmail = '';
  userEmailChange = new BehaviorSubject<string>('');

  constructor() {
    this.userChange.subscribe((value) => {
      this.token = value;
    });
    let token: string | null = localStorage.getItem('token');

    this.userChange.next(token);
    let userId = localStorage.getItem('userId') || '';
    let userName = localStorage.getItem('userName') || '';
    let userEmail = localStorage.getItem('userEmail') || '';
    this.userEmailChange.next(userEmail);

    this.userNameChange.next(userName);
    this.userIdChange.next(userId);
    this.userIdChange.subscribe((id) => {
      this.userId = id;
    });
    this.userNameChange.subscribe((name) => {
      this.userName = name;
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

  loginUser(id: string, token: string, name: string, email : string) {
    //! id is token
    this.userChange.next(id);
    localStorage.setItem('token', `${token}`);

    this.userIdChange.next(id);
    localStorage.setItem('userId', `${id}`);

    this.userNameChange.next(name);
    localStorage.setItem('userName', `${name}`);
     this.userEmailChange.next(email);
     localStorage.setItem('userEmail', `${email}`);
  }

  logoutUser() {
    this.userChange.next('');
    localStorage.setItem('token', '');
    this.userIdChange.next('');
    localStorage.setItem('userId', ``);
    this.userNameChange.next('');
    localStorage.setItem('userName', ``);
     this.userEmailChange.next('');
     localStorage.setItem('userEmail', ``);
  }
}
