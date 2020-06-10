import { Injectable } from '@angular/core';
import { URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HospitalModel } from '../../models/hospital.model';
import { UserService } from '../user/user.service';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(private http: HttpClient, private userService: UserService) { }

  loadHospitals(from: number = 0) {
    const URL_PATH = `${URL}/hospitals?from${from}`;
    return this.http.get(URL_PATH);
  }

  getHospital(id: string) {
    const URL_PATH = `${URL}/hospital/${id}?token=${this.userService.token}`;
    return this.http.get(URL_PATH);
  }

  searchHospitals(search: string) {
    const url = `${URL}/search/hospital/${search}`;
    return this.http.get(url).pipe(map((response: any) => response.data));
  }

  createHospital(hospital: HospitalModel) {
    const URL_PATH = `${URL}/hospital?token=${this.userService.token}`;
    return this.http.post(URL_PATH, hospital);
  }

  updateHospital(hospital: HospitalModel) {
    const URL_PATH = `${URL}/hospital/${hospital._id}?token=${this.userService.token}`;
    return this.http.put(URL_PATH, hospital);
  }

  deleteHospital(id: string) {
    const URL_PATH = `${URL}/hospital/${id}?token=${this.userService.token}`;
    return this.http.delete(URL_PATH).pipe(map((response: any) => {
      swal('Hospital borrado', 'Eliminado correctamente', 'success');
    }));
  }


}
