import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';

const PAGES_ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {title: 'Progreso'} },
            { path: 'graphic1', component: Graphic1Component, data: {title: 'Gráficos'} },
            { path: 'promises', component: PromisesComponent, data: {title: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: {title: 'Observadores'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Pérfil'} },
            { path: 'profile', component: ProfileComponent, data: {title: 'Pérfil'} },
            { path: 'users', component: UsuariosComponent, data: {title: 'Usuarios'} },
            { path: 'hospitals', component: HospitalComponent, data: {title: 'Hospitales'} },
            { path: 'doctors', component: DoctorsComponent, data: {title: 'Doctores'} },
            { path: 'doctor/:id', component: DoctorComponent, data: {title: 'Doctor'} },

            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGE_ROUTES = RouterModule.forChild(PAGES_ROUTES);
