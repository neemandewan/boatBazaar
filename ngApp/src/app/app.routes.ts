import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
<<<<<<< HEAD
import { PaymentPageComponent } from './component/payment-page/payment-page.component';
=======
>>>>>>> a9f0e82dea61034e043c2971b347621111b35de7
import { BoatComponent } from './component/boat/boat.component';
import { BoatMineComponent } from './component/boat-mine/boat-mine.component';
import { BoatInComponent } from './component/boat-in/boat-in.component';
import { BoatMineInComponent } from './component/boat-mine-in/boat-mine-in.component';
import { BoatEditComponent } from './component/boat-edit/boat-edit.component';
import { ProfileComponent } from './component/profile/profile.component';
import { BoatFeaturedComponent } from './component/boat-featured/boat-featured.component';
<<<<<<< HEAD
=======
import { PaymentPageComponent } from './component/payment-page/payment-page.component';
>>>>>>> a9f0e82dea61034e043c2971b347621111b35de7

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
<<<<<<< HEAD
    { path: 'payment', component: PaymentPageComponent },
=======
>>>>>>> a9f0e82dea61034e043c2971b347621111b35de7
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'home/featured/:id', component: BoatFeaturedComponent, canActivate: [AuthGuard]},
    { path: 'boat/form', component: BoatComponent, canActivate: [AuthGuard] },
    { path: 'boat/mine', component: BoatMineComponent, canActivate: [AuthGuard] },
    { path: 'boat/:id', component: BoatInComponent, canActivate: [AuthGuard] },
    { path: 'boat/mine/:id', component: BoatMineInComponent, canActivate: [AuthGuard] },
    { path: 'boat/mine/edit/:id', component: BoatEditComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
=======
    { path: 'payment/:id', component: PaymentPageComponent, canActivate: [AuthGuard]},
>>>>>>> a9f0e82dea61034e043c2971b347621111b35de7

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routes = RouterModule.forRoot(appRoutes);