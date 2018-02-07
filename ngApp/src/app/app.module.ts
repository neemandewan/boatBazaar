import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
   MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
   MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, 
   MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, 
   MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

import { LightboxModule } from 'angular2-lightbox';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { BoatMineComponent } from './component/boat-mine/boat-mine.component';
import { BoatMineInComponent } from './component/boat-mine-in/boat-mine-in.component';
import { BoatEditComponent } from './component/boat-edit/boat-edit.component';
import { ProfileComponent } from './component/profile/profile.component';
import { BoatFeaturedComponent } from './component/boat-featured/boat-featured.component';
import { PaymentPageComponent } from './component/payment-page/payment-page.component';
import { BoatComponent } from './component/boat/boat.component';
import { NoticesComponent } from './component/notices/notices.component';

import { routes } from './app.routes';
import { AuthGuard } from './guards/auth.guard';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { HomeService } from './services/home.service';
import { RegisterService } from './services/register.service';
import { BoatService } from './services/boat.service';
import { PaymentService } from './services/payment.service';

import { KeepCssPipe } from './pipes/keep-css.pipe';
import { DatePipe } from './pipes/date.pipe';
import { StatusPipe } from './pipes/status.pipe';

/*
 * Created on Tue Feb 06 2018
 * Prabhab Dewan
 * @Modified Niwesh Rai
 * @Modified Rajesh Subedi
 * Copyright (c) 2018 Your Company
 */


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BoatComponent,
    PaymentPageComponent,
    BoatMineComponent,
    BoatMineInComponent,
    KeepCssPipe,
    BoatEditComponent,
    ProfileComponent,
    BoatFeaturedComponent,
    PaymentPageComponent,
    BoatFeaturedComponent,
    BoatComponent,
    PaymentPageComponent,
    DatePipe,
    BoatFeaturedComponent,
    NoticesComponent,
    StatusPipe
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