import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { BoatComponent } from './component/boat/boat.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'boat/form', component: BoatComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routes = RouterModule.forRoot(appRoutes);