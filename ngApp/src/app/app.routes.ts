import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { BoatComponent } from './component/boat/boat.component';
import { BoatMineComponent } from './component/boat-mine/boat-mine.component';
import { BoatInComponent } from './component/boat-in/boat-in.component';
import { BoatMineInComponent } from './component/boat-mine-in/boat-mine-in.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'boat/form', component: BoatComponent, canActivate: [AuthGuard] },
    { path: 'boat/mine', component: BoatMineComponent, canActivate: [AuthGuard] },
    { path: 'boat/:id', component: BoatInComponent, canActivate: [AuthGuard] },
    { path: 'boat/mine/:id', component: BoatMineInComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routes = RouterModule.forRoot(appRoutes);