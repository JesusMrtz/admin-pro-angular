import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  image: File;
  temporalImage: string | ArrayBuffer;

  constructor(public userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit(): void {}

  saveUser(user: UserModel) {
    this.user.name = user.name;
    if (!this.user.google) {
      this.user.email = user.email;
    }

    this.userService.updateUser(this.user).subscribe();
  }

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

  uploadImage() {
    this.userService.changeImage(this.image, this.user._id);
  }

}
