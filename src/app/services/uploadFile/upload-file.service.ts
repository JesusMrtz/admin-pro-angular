import { Injectable } from '@angular/core';
import { URL } from 'src/environments/environment';
import { XhrFactory } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, type: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      const url = `${URL}/upload/${type}/${id}`;

      formData.append('image', file, file.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
      };

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
