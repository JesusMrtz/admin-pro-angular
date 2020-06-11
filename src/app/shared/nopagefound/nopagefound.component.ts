import { Component, OnInit } from '@angular/core';

declare function initPlugins();
@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: [
  ]
})
export class NopagefoundComponent implements OnInit {
  actualYear = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    initPlugins();
  }

}
