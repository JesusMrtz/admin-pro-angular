import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.returnObservable()
    .subscribe((counterResponse: number) => console.log('Subs: ', counterResponse),
    (error) => console.error('Hay un eror: ', error));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;

        const outputData = {
          value: counter
        };
        observer.next(outputData);

        /*
        if (counter === 10) {
          clearInterval(interval);
          observer.complete();
        }
        */

        /*
        if (counter === 2) {
          clearInterval(interval);
          observer.error('Auxilio');
        }
        */
      }, 1000);
    }).pipe(map((response: any) => response.value),
    filter((value) => value % 2 === 1));
  }

}
