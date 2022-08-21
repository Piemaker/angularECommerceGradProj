import { Subscription } from 'rxjs';
import { LoginLogoutService } from './../../../services/login-logout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  faMailBulk = faMailBulk;
  faUser = faUser;
  userName = '';
  userEmail = '';
  loginLogoutUserNameSubscription: Subscription | undefined;
  loginLogoutUserEmailSubscription: Subscription | undefined;
  constructor(private _LoginLogoutService: LoginLogoutService) {
    this.loginLogoutUserNameSubscription =
      _LoginLogoutService.userNameChange.subscribe((name) => {
        this.userName = name;
      });
    this.loginLogoutUserEmailSubscription =
      _LoginLogoutService.userEmailChange.subscribe((email) => {
        this.userEmail = email;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loginLogoutUserNameSubscription?.unsubscribe;
    this.loginLogoutUserEmailSubscription?.unsubscribe;
  }
}
