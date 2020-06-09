import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { UploadFileService } from '../../services/uploadFile/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {
  image: File;
  temporalImage: string | ArrayBuffer;

  constructor(public uploadFileService: UploadFileService, public modalUploadService: ModalUploadService) {
    console.log('Modal listo');
  }

  ngOnInit(): void {}

  changeImage(file: File) {
    if (!file) {
      this.image = null;
      return ;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.image = null;
      this.temporalImage = null;
      return;
    }

    this.image = file;

    const reader = new FileReader();
    const urlTemporalImage = reader.readAsDataURL(file);
    reader.onloadend = () => this.temporalImage = reader.result;
  }

  uploadFile() {
    this.uploadFileService.uploadFile(this.image, this.modalUploadService.type, this.modalUploadService.id)
    .then((response) => {
      this.modalUploadService.notification.emit(response);
      this.hiddenModal();
    })
    .catch((error) => {
      console.log('Error en la carga: ' + error);
    });
  }

  hiddenModal() {
    this.image = null;
    this.temporalImage = null;
    this.modalUploadService.hiddenModal();
  }

}
