import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Módulos
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
// Routing
import { PAGE_ROUTES } from './pages.routing';
// Component
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';
import { IncrementComponent } from '../components/increment/increment.component';
import { GraphicChartComponent } from '../components/graphic-chart/graphic-chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphic1Component,
        IncrementComponent,
        GraphicChartComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGE_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
     ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphic1Component
    ],
    providers: [],
})
export class PageModule {}
