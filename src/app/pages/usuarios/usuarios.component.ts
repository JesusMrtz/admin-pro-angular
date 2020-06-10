import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  users: UserModel[] = [];
  from = 0;
  countUsers = 0;
  loading = false;

  constructor(public userService: UserService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.loadUser();
    this.modalUploadService.notification.subscribe((response) => {
      this.loadUser();
    });
  }

  loadUser() {
    this.loading = true;
    this.userService.loadUsers(this.from).subscribe((response: any) => {
      this.countUsers = response.count;
      console.log(response);
      this.users = response.data;
      this.loading = false;
    });
  }

  previusUsers(value: number) {
    if (this.from > 0) {
      this.from +=  value;
      this.loadUser();
    }
  }

  nextUsers(value: number) {
    if (this.from <= this.countUsers) {
      this.from +=  value;
      this.loadUser();
    }
  }

  searchUsers(search: string) {
    if (search.length <= 0) {
      this.loadUser();
      return;
    }

    this.userService.searchUsers(search).subscribe((response: any) => this.users = response);
  }

  deleteUser(user: UserModel) {
    if (user._id === localStorage.getItem('id')) {
      swal('No puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Eliminar registro',
      text: `Desea borrar a ${user.name}`,
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    })
    .then((deleteUser) => {
      if (deleteUser) {
        this.userService.deleteUser(user._id).subscribe((response) => {
          this.loadUser();
        });
      }
    });
  }

  updateRole(user: UserModel) {
    this.userService.updateUser(user).subscribe();
  }

  showModal(id: string) {
    this.modalUploadService.showModal('user', id);
  }

}
