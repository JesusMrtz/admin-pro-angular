import { Component, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graphic-chart',
  templateUrl: './graphic-chart.component.html',
  styles: [
  ]
})
export class GraphicChartComponent{
  @Input() legend: string;
  @Input() chartData: MultiDataSet;
  @Input() chartLabels: Label[];
  @Input() chartType: ChartType;

  constructor() { }
}
