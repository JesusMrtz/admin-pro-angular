import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent,
        NopagefoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule
     ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent,
        NopagefoundComponent
    ],
    providers: [],
})
export class SharedModule {}
