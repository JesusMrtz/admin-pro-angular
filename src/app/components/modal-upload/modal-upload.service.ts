import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public type: string;
  public id: string;

  public displayModal = 'display-none';

  public notification = new EventEmitter<any>();

  constructor() {}

  hiddenModal() {
    this.displayModal = 'display-none';
    this.type = null;
    this.id = null;
  }

  showModal(type: string, id: string) {
    this.displayModal = '';
    this.id = id;
    this.type = type;
  }
}
