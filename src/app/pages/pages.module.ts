import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Módulos
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
// Routing
import { PAGE_ROUTES } from './pages.routing';
// Component
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';
import { IncrementComponent } from '../components/increment/increment.component';
import { GraphicChartComponent } from '../components/graphic-chart/graphic-chart.component';

@NgModule({
    declarations: [
        PagesComponent,
        ProgressComponent,
        Graphic1Component,
        IncrementComponent,
        GraphicChartComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGE_ROUTES,
        FormsModule,
        ChartsModule
     ],
    exports: [
        PagesComponent,
        ProgressComponent,
        Graphic1Component
    ],
    providers: [],
})
export class PageModule {}
