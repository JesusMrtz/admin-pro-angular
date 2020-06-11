import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { URL } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { UploadFileService } from '../uploadFile/upload-file.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserModel;
  token: string;
  menu: any[] = [];

  constructor(private http: HttpClient, private router: Router, private uploadFileService: UploadFileService) {
    this.loadStorage();
  }

  loadUsers(from: number) {
    const url = `${URL}/users?from=${from}`;

    return this.http.get(url);
  }

  searchUsers(search: string) {
    const url = `${URL}/search/user/${search}`;
    return this.http.get(url).pipe(map((response: any) => response.data));
  }

  createUser(user: UserModel) {
    return this.http.post(`${URL}/user`, user).pipe(map((response: any) => {
      this.saveStorage(response);
      swal('Usuario creado', user.email, 'success');
      return true;
    }),
     catchError((error: any) => {
      swal(error.error.message, error.error.errors.message, 'error');
      return Observable.throw(error);
    }));
  }

  updateUser(user: UserModel) {
    const url = `${URL}/user/${user._id}?token=${this.token}`;

    return this.http.put(url, user).pipe(map((response: any) => {
      if (response._id === this.user._id) {
        response.id = user._id;
        response.token = this.token;
        response.menu = this.menu;
        this.saveStorage(response);
      }

      swal('Usuario actualizado', user.name, 'success');
      return true;
    }),
    catchError((error: any) => {
     swal(error.error.message, error.error.errors.message, 'error');
     return Observable.throw(error);
   }));
  }

  deleteUser(id: string) {
    const url = `${URL}/user/${id}?token=${this.token}`;
    return this.http.delete(url);
  }

  changeImage(file: File, id: string) {
    this.uploadFileService.uploadFile(file, 'user', id)
    .then((response: any) => {
      this.user.image = response.data.image;
      swal('Imagen actualizada', this.user.name, 'success');
      response.id = this.user._id;
      response.token = this.token;
      response.menu = this.menu;
      this.saveStorage(response);
    })
    .catch((error) => {
      console.log(error);
    });
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
      console.log(response);
      this.saveStorage(response);
      return true;
    }),
    catchError((error: any) => {
      swal('Error', error.error.message, 'error');
      return Observable.throw(error);
    }));
  }

  loginByGoogle(token: string) {
    return this.http.post(`${URL}/login/google`, {token}).pipe(map((response: any) => {
      console.log(response);
      this.saveStorage(response);
      return true;
    }));
  }

  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loadStorage() {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  saveStorage(response: any) {
    localStorage.setItem('id', response.id);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('menu', JSON.stringify(response.menu));

    this.user = response.data;
    this.token = response.token;
    this.menu = response.menu;
  }
}
