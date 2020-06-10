import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/environments/environment';
import { UserService } from './user/user.service';
import { map } from 'rxjs/operators';
import { DoctorModel } from '../models/doctor.model';

import swal from 'sweetalert';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private userService: UserService, private http: HttpClient) { }

  loadDoctors() {
    const URL_PATH = `${URL}/doctors?token=${this.userService.token}`;
    return this.http.get(URL_PATH);
  }

  loadDoctor(id: string) {
    const url = `${URL}/doctor/${id}?token=${this.userService.token}`;
    return this.http.get(url);
  }


  searchDoctors(search: string) {
    const url = `${URL}/search/doctor/${search}`;
    return this.http.get(url).pipe(map((response: any) => response.data));
  }

  saveDoctor(doctor: DoctorModel) {
    const URL_PATH_CREATE = `${URL}/doctor?token=${this.userService.token}`;

    if (doctor._id) {
      const URL_PATH_UPDATE = `${URL}/doctor/${doctor._id}?token=${this.userService.token}`;

      return this.http.put(URL_PATH_UPDATE, doctor).pipe(map((response: any) => {
        swal('Médico actualizado', doctor.name, 'success');
        return response.data;
      }));
    }

    return this.http.post(URL_PATH_CREATE, doctor).pipe(map((response: any) => {
      swal('Médico creado', doctor.name, 'success');
      return response.data;
    }));
  }

  deleteDoctor(id: string) {
    const url = `${URL}/doctor/${id}?token=${this.userService.token}`;
    return this.http.delete(url);
  }
}
