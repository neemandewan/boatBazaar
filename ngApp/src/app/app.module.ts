import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { routes } from './app.routes';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { HomeService } from './services/home.service';
import { RegisterService } from './services/register.service';

import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';

import { FooterComponent } from './component/footer/footer.component';


import {MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
   MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
   MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, 
   MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, 
   MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { BoatService } from './services/boat.service';
import { BoatMineComponent } from './component/boat-mine/boat-mine.component';
import { BoatInComponent } from './component/boat-in/boat-in.component';
import { BoatMineInComponent } from './component/boat-mine-in/boat-mine-in.component';
import { KeepCssPipe } from './pipes/keep-css.pipe';

import { LightboxModule } from 'angular2-lightbox';
import { BoatEditComponent } from './component/boat-edit/boat-edit.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DatePipe } from './pipes/date.pipe';
import { BoatFeaturedComponent } from './component/boat-featured/boat-featured.component';
import { PaymentPageComponent } from './component/payment-page/payment-page.component';
import { BoatComponent } from './component/boat/boat.component';
import { NoticesComponent } from './component/notices/notices.component';
import { PaymentService } from './services/payment.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BoatComponent,
    FooterComponent,
    PaymentPageComponent,
    BoatMineComponent,
    BoatInComponent,
    BoatMineInComponent,
    KeepCssPipe,
    BoatEditComponent,
    ProfileComponent,
    BoatFeaturedComponent,
    PaymentPageComponent,
    FooterComponent,
    BoatFeaturedComponent,
    BoatComponent,
    PaymentPageComponent,
    DatePipe,
    BoatFeaturedComponent,
    NoticesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routes,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, 
    MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, 
    MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, 
    MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
    MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    LightboxModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    HomeService,
    BoatService,
    RegisterService,
    PaymentService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }