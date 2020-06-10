import { Pipe, PipeTransform } from '@angular/core';
import { URL } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, type: string = 'user'): unknown {
    if (image !== undefined) {
      if (image.indexOf('https') >= 0) {
        return image;
      }
    }

    const URL_PATH = `${URL}/images`;
    if ((type === 'user' || type === 'doctor' || type === 'hospital')) {
      return URL_PATH + `/${type}/${image}`;
    } else {
      return URL_PATH + '/user/xxxx';
    }

  }
}
