import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/environments/environment';
import { UserModel } from '../../models/user.model';
import { DoctorModel } from 'src/app/models/doctor.model';
import { HospitalModel } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  users: UserModel[] = [];
  doctors: DoctorModel[] = [];
  hospitals: HospitalModel[] = [];

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    activatedRoute.params.subscribe((response: any) => this.search(response.search));
  }

  ngOnInit(): void {}

  search(search: string) {
    const url = `${URL}/search/collection/todo/${search}`;
    return this.http.get(url).subscribe((response: any) => {
      this.doctors = response.data.doctor;
      this.hospitals = response.data.hospitals;
      this.users = response.data.users;
    });
  }

}
