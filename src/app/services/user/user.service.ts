import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { URL } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserModel;
  token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.loadStorage();
  }

  createUser(user: UserModel) {
    return this.http.post(`${URL}/user`, user).pipe(map((response: any) => {
      swal('Usuario creado', user.email, 'success');
      return response.data;
    }));
  }

  isLogged() {
    return this.token.length > 5;
  }

  login(user: UserModel, remember: boolean) {
    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(`${URL}/login`, user).pipe(map((response: any) => {
      this.saveStorage(response);
      return true;
    }));
  }

  loginByGoogle(token: string) {
    return this.http.post(`${URL}/login/google`, {token}).pipe(map((response: any) => {
      this.saveStorage(response);
      return true;
    }));
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  loadStorage() {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveStorage(response: any) {
    localStorage.setItem('id', response.id);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.data));

    this.user = response.data;
    this.token = response.token;
  }
}
