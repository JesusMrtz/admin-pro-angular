import { Component, OnInit } from '@angular/core';
import { HospitalModel } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  from = 0;
  loading = false;
  countHospitals = 0;
  hospitals: HospitalModel[] = [];

  constructor(private hospitalService: HospitalService, private modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.loadHospitals();
    this.modalUploadService.notification.subscribe(() => {
      this.loadHospitals();
    });
  }

  searchHospitals(search: string) {
    if (search.length <= 0) {
      this.loadHospitals();
      return;
    }
    this.hospitalService.searchHospitals(search).subscribe((response: any) => this.hospitals = response);
  }

  previusHospitals(value: number) {
    if (this.from > 0) {
      this.from +=  value;
      this.loadHospitals();
    }
  }

  nextHospitals(value: number) {
    if (this.from <= this.countHospitals) {
      this.from +=  value;
      this.loadHospitals();
    }
  }

  createHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: {
        element: 'input'
      },
      icon: 'info',
      buttons: ['Cancelar', true],
      dangerMode: true
    })
    .then((value: string) => {
      if (value === null) {
        return;
      }
      if (value.trim().length === 0) {
        return;
      }
      const hospital = new HospitalModel(value);
      this.hospitalService.createHospital(hospital).subscribe((response: any) => {
        this.loadHospitals();
      });
    });
  }

  deleteHospital(hospital: HospitalModel) {
    this.hospitalService.deleteHospital(hospital._id).subscribe(() => {
      this.loadHospitals();
    });

    swal({
      title: 'Eliminar registro',
      text: `Desea borrar a ${hospital.name}`,
      icon: 'warning',
      buttons: {
        cancel: true,
        catch: {
          text: 'Throw Pokéball!',
          value: 'catch',
        },
        defeat: true,
      },
    })
    .then((deleteUser) => {
      if (deleteUser === 'eliminar') {
        this.hospitalService.deleteHospital(hospital._id).subscribe((response) => {
          this.loadHospitals();
        });
      }
    });
  }

  loadHospitals() {
    this.hospitalService.loadHospitals(this.from).subscribe((response: any) => {
      this.countHospitals = response.count;
      this.hospitals = response.data;
    });
  }

  showModal(id: string) {
    this.modalUploadService.showModal('hospital', id);
  }

}
