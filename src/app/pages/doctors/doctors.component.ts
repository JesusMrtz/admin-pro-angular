import { Component, OnInit } from '@angular/core';
import { DoctorModel } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {
  countDoctors = 0;
  doctors: DoctorModel[] = [];

  constructor(private doctorsService: DoctorService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }


  searchDoctors(search: string) {
    if (search.length <= 0) {
      this.loadDoctors();
      return;
    }

    this.doctorsService.searchDoctors(search).subscribe((response: any) => this.doctors = response);
  }

  deleteDoctor(doctor: DoctorModel) {
    swal({
      title: 'Eliminar registro',
      text: `Desea borrar a ${doctor.name}`,
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    })
    .then((deleteUser) => {
      if (deleteUser) {
        this.doctorsService.deleteDoctor(doctor._id).subscribe((response) => {
          this.loadDoctors();
        });
      }
    });
  }

  loadDoctors() {
    this.doctorsService.loadDoctors().subscribe((response: any) => {
      console.log(response);
      this.countDoctors = response.count;
      this.doctors = response.data;
    });
  }

}
