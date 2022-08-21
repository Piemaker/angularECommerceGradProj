import { LoginLogoutService } from './../../services/login-logout.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserLogin } from '../../models/user';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // @ViewChild('f', { static: true }) form: NgForm;
  userForm: IUserLogin = {
    email: '',
    password: '',
  };
  error = '';
  isLoading = false;
  loginSubscription: Subscription | undefined;
  faBackward = faBackward;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _loginLogoutService: LoginLogoutService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;

    this.loginSubscription = this._userService
      .postLoginUser(this.userForm)
      .subscribe({
        next: (data) => {
          this.isLoading = true;
          this._loginLogoutService.loginUser(`${data.email}`, `${data.token}`, `${data.name}`,`${data.email}`);

          // this._loginLogoutService.loginUser(`${data.id}`);
          this._router.navigate(['home']);
        },
        error: (error) => {
          this.isLoading = false;

          this.error = '';
          this.error = error.error.errorMessage;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
