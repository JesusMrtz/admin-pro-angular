import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { UserModel } from '../models/user.model';
import { CLIENT_ID_GOOGLE_AUTH } from '../../environments/environment';

declare function initPlugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  remember = false;
  auth2: any;

  constructor(public router: Router, private userService: UserService) { }

  ngOnInit(): void {
    initPlugins();
    this.loginByGoogle();

    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.remember = true;
    }
  }

  login(form: NgForm) {
    if (form.valid) {
      const user = new UserModel(null, form.value.email, form.value.password);

      this.userService.login(user, this.remember).subscribe(() => this.router.navigate(['/dashboard']));
    }
  }

  loginByGoogle() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: CLIENT_ID_GOOGLE_AUTH,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btn-session-google'));

    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element,{}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.userService.loginByGoogle(token).subscribe(() => this.router.navigate(['/dashboard']));
    });
  }

}
