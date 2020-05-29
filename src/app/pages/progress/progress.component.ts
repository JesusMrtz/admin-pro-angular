import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent {
  progressBarBlue = 30;
  progressBarGreen = 20;

  constructor() { }
}
