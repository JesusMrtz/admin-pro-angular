import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalModel } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { DoctorModel } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {
  hospitals: HospitalModel[] = [];
  doctor: DoctorModel = new DoctorModel('', '', '', '');
  hospital: HospitalModel = new HospitalModel('');

  constructor(private hospitalService: HospitalService, private doctorService: DoctorService,
              private router: Router, private activatedRoute: ActivatedRoute, private modalUploadService: ModalUploadService) {
                activatedRoute.params.subscribe((params: any) => {
                  const id = params.id;

                  if (id !== 'new') {
                    this.loadDoctor(id);
                  }
                });
              }

  ngOnInit(): void {
    this.loadHospitals();
    this.modalUploadService.notification.subscribe((response: any) => this.doctor.image = response.data.image);
  }

  loadDoctor(id: string) {
    this.doctorService.loadDoctor(id).subscribe((response: any) => {
      this.hospital = response.data.hospital;
      this.doctor = response.data;
      this.doctor.hospital = response.data.hospital._id;
    });
  }

  saveDoctor(form: NgForm) {
    if (form.valid) {
      this.doctorService.saveDoctor(this.doctor).subscribe((response: any) => {
        this.doctor._id = response._id;
        this.router.navigate(['/doctor', response._id]);
      });
    }
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe((response: any) => this.hospitals = response.data);
  }

  changeHospital(id: string) {
    this.hospitalService.getHospital(id).subscribe((response: any) => this.hospital = response.data);
  }

  changePhoto() {
    this.modalUploadService.showModal('doctor', this.doctor._id);
  }

}
