import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent {
  @ViewChild('inputProgress') txtProgress: ElementRef;
  @Input() legend = 'Leyenda';
  @Input() percent = 50;

  @Output() changeValue: EventEmitter<number> = new EventEmitter();

  constructor() {}

  incrementPercent() {
    if (this.percent < 100) {
      this.percent = Number(this.percent)  + 5;
      this.changeValue.emit(this.percent);
    }
  }

  decrementPercent() {
    if (this.percent > 0) {
      this.percent = Number(this.percent) - 5;
      this.changeValue.emit(this.percent);
    }
  }

  onChange(newValue: number) {
    if (newValue  >= 100) {
      this.percent = 100;
    } else if (this.percent <= 0){
      this.percent = 0;
    } else {
      this.percent = newValue;
    }
    this.txtProgress.nativeElement.value = this.percent;
    this.changeValue.emit(this.percent);
    this.txtProgress.nativeElement.focus();
  }

}
