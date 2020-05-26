import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Módulos
import { SharedModule } from '../shared/shared.module';
// Routing
import { PAGE_ROUTES } from './pages.routing';
// Component
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';

@NgModule({
    declarations: [
        PagesComponent,
        ProgressComponent,
        Graphic1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGE_ROUTES
     ],
    exports: [
        PagesComponent,
        ProgressComponent,
        Graphic1Component
    ],
    providers: [],
})
export class PageModule {}
