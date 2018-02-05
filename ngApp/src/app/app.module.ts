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

import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';

import { BoatComponent } from './component/boat/boat.component';
import { FooterComponent } from './component/footer/footer.component';


import {MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
   MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
   MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, 
   MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, 
   MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BoatComponent,
    FooterComponent
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
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    HomeService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }